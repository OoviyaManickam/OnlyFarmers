"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ChartBarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

export default function SubmitStakePage() {
  const [selectedFarm, setSelectedFarm] = useState<any>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const router = useRouter();

  useEffect(() => {
    const farm = localStorage.getItem('selectedFarm');
    if (farm) {
      setSelectedFarm(JSON.parse(farm));
    } else {
      router.push('/start-stake');
    }
  }, [router]);

  if (!selectedFarm) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black/0 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/0 to-transparent"></div>
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 lg:px-8 pb-20 pt-5 flex-grow">
          <div className="pt-15 lg:pt-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto relative mb-12"
            >
              {/* Spotlight Effect */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <h1 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text mb-6 font-space-grotesk">
                Submit Your Stake
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-space-grotesk tracking-wider">
                Review your selected farm and enter the amount you wish to stake.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Farm Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-zinc-900/50 to-black p-6 rounded-2xl border border-zinc-800/50"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white font-space-grotesk">{selectedFarm.id}</h3>
                    <p className="text-zinc-400 text-sm">PiCore ID: {selectedFarm.piCoreId}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    selectedFarm.status === "Available" 
                      ? "bg-green-500/20 text-green-400" 
                      : "bg-red-500/20 text-red-400"
                  }`}>
                    {selectedFarm.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-zinc-800/30 p-3 rounded-xl">
                    <p className="text-zinc-400 text-sm">Max Yield</p>
                    <p className="text-xl font-bold text-blue-500">{selectedFarm.maxYield}%</p>
                  </div>
                  <div className="bg-zinc-800/30 p-3 rounded-xl">
                    <p className="text-zinc-400 text-sm">Farm Health</p>
                    <p className="text-xl font-bold text-cyan-500">{selectedFarm.health}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-zinc-800/30 p-3 rounded-xl">
                    <p className="text-zinc-400 text-sm">Yield Score</p>
                    <p className="text-xl font-bold text-purple-500">{selectedFarm.yieldScore}</p>
                  </div>
                  <div className="bg-zinc-800/30 p-3 rounded-xl">
                    <p className="text-zinc-400 text-sm">Farm APY</p>
                    <p className="text-xl font-bold text-blue-500">{selectedFarm.apy}%</p>
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
                        d={selectedFarm.growthData.map((value: number, i: number) => 
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
              </motion.div>

              {/* Staking Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-zinc-900/50 to-black p-6 rounded-2xl border border-zinc-800/50"
              >
                <h2 className="text-2xl font-bold text-white mb-6 font-space-grotesk">Staking Details</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Stake Amount</label>
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="Enter amount to stake"
                      className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                    />
                  </div>

                  <div className="bg-zinc-800/30 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-2">Estimated Returns</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Annual Yield</span>
                        <span className="text-blue-500 font-semibold">
                          {stakeAmount ? ((parseFloat(stakeAmount) * selectedFarm.apy) / 100).toFixed(2) : '0.00'} Pi
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Monthly Yield</span>
                        <span className="text-cyan-500 font-semibold">
                          {stakeAmount ? ((parseFloat(stakeAmount) * selectedFarm.apy) / 1200).toFixed(2) : '0.00'} Pi
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => router.push('/start-stake')}
                    className="w-full py-3 px-4 bg-zinc-800/30 border border-zinc-700/50 text-zinc-300 rounded-xl text-lg font-semibold transition-all duration-300 hover:border-blue-500/50 flex items-center justify-center gap-2"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Back to Farms
                  </button>

                  <button 
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-black rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20"
                  >
                    Confirm Stake
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
