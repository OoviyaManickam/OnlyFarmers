"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPublicClient, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { MagnifyingGlassIcon, FunnelIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { Contract_ABI, Contract_Address } from '@/components/abi';

// You can change 'mainnet' to your target chain, or use a custom RPC URL
const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

// Dummy graph data for UI
const dummyGrowthData = [
  [10, 15, 18, 22, 25, 24.5],
  [10, 14, 17, 21, 23, 24.9],
  [8, 11, 14, 17, 20, 22.3],
  [12, 16, 20, 23, 25, 26.3],
  [7, 11, 14, 17, 19, 21.5],
  [9, 13, 16, 19, 22, 23.7],
  [11, 15, 18, 21, 24, 25.1],
  [6, 10, 13, 16, 18, 20.8],
  [8, 12, 15, 18, 20, 22.8],
  [12, 16, 19, 22, 24, 25.8],
];

type Farm = {
  id: string;
  name: string;
  piCoreId: string;
  maxYield: number;
  health: string;
  yieldScore: number;
  apy: number;
  status: string;
  growthData: number[];
};

type ContractFarm = {
  id: bigint;
  name: string;
  piId: string;
  health: bigint;
  apy: bigint;
  owner: string;
};

export default function StartStakePage() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [expandedFarm, setExpandedFarm] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("yield");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchFarms = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const data = await publicClient.readContract({
          address: Contract_Address,
          abi: Contract_ABI,
          functionName: 'getAllFarms',
        });
        if (data && Array.isArray(data)) {
          setFarms(
            (data as ContractFarm[]).map((farm, idx: number) => ({
              id: `FARM-${farm.id.toString()}`,
              name: farm.name,
              piCoreId: farm.piId,
              health: Number(farm.health) > 80 ? "Excellent" : Number(farm.health) > 60 ? "Good" : "Average",
              apy: Number(farm.apy),
              status: "Available",
              maxYield: Number(farm.apy),
              yieldScore: Number(farm.health),
              growthData: dummyGrowthData[idx % dummyGrowthData.length],
            }))
          );
        }
        setIsLoading(false);
      } catch {
        setIsError(true);
        setIsLoading(false);
      }
    };
    fetchFarms();
  }, []);

  const handleStakeNow = (farm: Farm) => {
    // Store the farm data in localStorage for the submit-stake page
    localStorage.setItem('selectedFarm', JSON.stringify(farm));
    router.push('/submit-stake');
  };

  // Filter and sort logic (optional, can be improved)
  let displayedFarms = farms.filter(farm =>
    farm.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  if (sortBy === "yield") {
    displayedFarms = [...displayedFarms].sort((a, b) => b.apy - a.apy);
  } else if (sortBy === "health") {
    displayedFarms = [...displayedFarms].sort((a, b) => b.yieldScore - a.yieldScore);
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black/0 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/0 to-transparent"></div>
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 lg:px-8 p-5 flex-grow">
          <div className="pt-32 lg:pt-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto relative mb-12"
            >
              {/* Spotlight Effect */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <h1 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text mb-6 font-space-grotesk">
                Start Your Staking Journey
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-space-grotesk tracking-wider">
                Choose your preferred farm and begin your staking journey with real-time insights and analytics.
              </p>
            </motion.div>

            {/* Filter Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-zinc-900/50 to-black p-6 rounded-2xl border border-zinc-800/50 mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Search by Farm ID"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                  />
                </div>

                {/* Sort */}
                <div className="relative">
                  <FunnelIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-zinc-300 focus:outline-none focus:border-blue-500/50 transition-colors appearance-none"
                  >
                    <option value="yield">Highest APY</option>
                    <option value="health">Healthiest Farms</option>
                    <option value="available">Available to Stake</option>
                  </select>
                </div>

                {/* Status Filter */}
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-zinc-300 hover:border-blue-500/50 transition-colors">
                    All
                  </button>
                  <button className="flex-1 px-4 py-2 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-zinc-300 hover:border-blue-500/50 transition-colors">
                    Available
                  </button>
                  <button className="flex-1 px-4 py-2 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-zinc-300 hover:border-blue-500/50 transition-colors">
                    Full
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Loading/Error UI */}
            {isLoading && <div className="text-center text-zinc-400">Loading farms...</div>}
            {isError && <div className="text-center text-red-400">Failed to load farms.</div>}

            {/* Farm Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedFarms.map((farm, index) => (
                <motion.div
                  key={farm.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                >
                  {/* Farm Card */}
                  <div className="bg-gradient-to-br from-zinc-900/50 to-black p-6 rounded-2xl border border-zinc-800/50 hover:border-blue-500/50 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white font-space-grotesk">{farm.name}</h3>
                        <p className="text-zinc-400 text-sm">PiCore ID: {farm.piCoreId}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        farm.status === "Available" 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-red-500/20 text-red-400"
                      }`}>
                        {farm.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-zinc-800/30 p-3 rounded-xl">
                        <p className="text-zinc-400 text-sm">Max Yield</p>
                        <p className="text-xl font-bold text-blue-500">{farm.maxYield}%</p>
                      </div>
                      <div className="bg-zinc-800/30 p-3 rounded-xl">
                        <p className="text-zinc-400 text-sm">Farm Health</p>
                        <p className="text-xl font-bold text-cyan-500">{farm.health}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedFarm(expandedFarm === farm.id ? null : farm.id)}
                      className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-black rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                    >
                      More Details
                    </button>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedFarm === farm.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 overflow-hidden"
                        >
                          <div className="space-y-4 pt-4 border-t border-zinc-800/50">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="bg-zinc-800/30 p-3 rounded-xl">
                                <p className="text-zinc-400 text-sm">Yield Score</p>
                                <p className="text-xl font-bold text-purple-500">{farm.yieldScore}</p>
                              </div>
                              <div className="bg-zinc-800/30 p-3 rounded-xl">
                                <p className="text-zinc-400 text-sm">Farm APY</p>
                                <p className="text-xl font-bold text-blue-500">{farm.apy}%</p>
                              </div>
                            </div>

                            {/* Growth Graph */}
                            <div className="bg-zinc-800/30 p-4 rounded-xl">
                              <div className="flex items-center justify-between mb-2">
                                <p className="text-zinc-400 text-sm">Growth Trend</p>
                                <ChartBarIcon className="h-5 w-5 text-blue-500" />
                              </div>
                              <div className="h-32 relative">
                                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                                  <path
                                    d={farm.growthData.map((value, i) => 
                                      `${i === 0 ? 'M' : 'L'} ${i * 20} ${50 - value * 2}`
                                    ).join(' ')}
                                    fill="none"
                                    stroke="url(#gradient)"
                                    strokeWidth="2"
                                  />
                                  <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                      <stop offset="0%" stopColor="#3B82F6" />
                                      <stop offset="50%" stopColor="#06B6D4" />
                                      <stop offset="100%" stopColor="#8B5CF6" />
                                    </linearGradient>
                                  </defs>
                                </svg>
                              </div>
                            </div>

                            <button 
                              onClick={() => handleStakeNow(farm)}
                              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-black rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                            >
                              Stake Now
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}