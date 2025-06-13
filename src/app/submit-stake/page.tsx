"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ChartBarIcon, ArrowLeftIcon, ChevronDownIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

// Token options with their icons and decimals
const tokenOptions = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷', decimals: 18 },
  { symbol: 'BTC', name: 'Bitcoin', icon: '₿', decimals: 8 },
  { symbol: 'SOL', name: 'Solana', icon: '◎', decimals: 9 },
  { symbol: 'USDT', name: 'Tether', icon: '💵', decimals: 6 },
  { symbol: 'USDC', name: 'USD Coin', icon: '💲', decimals: 6 },
  { symbol: 'BNB', name: 'Binance Coin', icon: '🔶', decimals: 18 },
];

const durationOptions = [
  { value: '3', label: '3 Months', multiplier: 0.25 },
  { value: '6', label: '6 Months', multiplier: 0.5 },
  { value: '12', label: '1 Year', multiplier: 1 },
];

export default function SubmitStakePage() {
  const [selectedFarm, setSelectedFarm] = useState<any>(null);
  const [stakeAmount, setStakeAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const [selectedDuration, setSelectedDuration] = useState(durationOptions[0]);
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const farm = localStorage.getItem('selectedFarm');
    if (farm) {
      setSelectedFarm(JSON.parse(farm));
    } else {
      router.push('/start-stake');
    }
  }, [router]);

  const calculateReturns = (amount: string, duration: string) => {
    if (!amount) return { annual: '0.00', total: '0.00' };
    const numAmount = parseFloat(amount);
    const annualYield = (numAmount * selectedFarm.apy) / 100;
    const durationMultiplier = durationOptions.find(d => d.value === duration)?.multiplier || 1;
    const totalYield = annualYield * durationMultiplier;
    return {
      annual: annualYield.toFixed(2),
      total: totalYield.toFixed(2)
    };
  };

  const handleConfirmStake = () => {
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/start-stake');
    }, 4000);
  };

  if (!selectedFarm) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black/0 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/0 to-transparent"></div>
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 lg:px-8 pb-20  flex-grow">
          <div className="pt-10 lg:pt-35">
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
                <div className="flex justify-between items-start mb-6">
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

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-zinc-800/30 p-3 rounded-xl">
                    <p className="text-zinc-400 text-sm">Max Yield</p>
                    <p className="text-xl font-bold text-blue-500">{selectedFarm.maxYield}%</p>
                  </div>
                  <div className="bg-zinc-800/30 p-3 rounded-xl">
                    <p className="text-zinc-400 text-sm">Farm Health</p>
                    <p className="text-xl font-bold text-cyan-500">{selectedFarm.health}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
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
                <div className="bg-zinc-800/30 p-4 rounded-xl mb-6">
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

                {/* Additional Farm Information */}
                <div className="bg-zinc-800/30 p-4 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-3">Farm Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Minimum Stake</span>
                      <span className="text-zinc-300">100 {selectedToken.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Maximum Stake</span>
                      <span className="text-zinc-300">10,000 {selectedToken.symbol}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Lock Period</span>
                      <span className="text-zinc-300">30 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Withdrawal Fee</span>
                      <span className="text-zinc-300">0.5%</span>
                    </div>
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
                  {/* Token Selection */}
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Select Token</label>
                    <div className="relative">
                      <button
                        onClick={() => setShowTokenDropdown(!showTokenDropdown)}
                        className="w-full px-4 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-zinc-300 flex items-center justify-between hover:border-blue-500/50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{selectedToken.icon}</span>
                          <span>{selectedToken.name} ({selectedToken.symbol})</span>
                        </div>
                        <ChevronDownIcon className="h-5 w-5" />
                      </button>
                      
                      {showTokenDropdown && (
                        <div className="absolute z-10 w-full mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg">
                          {tokenOptions.map((token) => (
                            <button
                              key={token.symbol}
                              onClick={() => {
                                setSelectedToken(token);
                                setShowTokenDropdown(false);
                              }}
                              className="w-full px-4 py-3 flex items-center gap-2 hover:bg-zinc-800/50 transition-colors"
                            >
                              <span className="text-xl">{token.icon}</span>
                              <span className="text-zinc-300">{token.name} ({token.symbol})</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stake Amount */}
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Stake Amount</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={stakeAmount}
                        onChange={(e) => setStakeAmount(e.target.value)}
                        placeholder="Enter amount to stake"
                        className="w-full pl-4 pr-16 py-3 bg-zinc-800/30 border border-zinc-700/50 rounded-xl text-zinc-300 placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                        {selectedToken.symbol}
                      </span>
                    </div>
                  </div>

                  {/* Duration Selection */}
                  <div>
                    <label className="block text-zinc-400 text-sm mb-2">Staking Duration</label>
                    <div className="grid grid-cols-3 gap-3">
                      {durationOptions.map((duration) => (
                        <button
                          key={duration.value}
                          onClick={() => setSelectedDuration(duration)}
                          className={`px-4 py-3 rounded-xl border transition-all duration-300 ${
                            selectedDuration.value === duration.value
                              ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                              : 'bg-zinc-800/30 border-zinc-700/50 text-zinc-300 hover:border-blue-500/50'
                          }`}
                        >
                          {duration.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Returns */}
                  <div className="bg-zinc-800/30 p-4 rounded-xl">
                    <h3 className="text-lg font-semibold text-white mb-2">Estimated Returns</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Annual Yield</span>
                        <span className="text-blue-500 font-semibold">
                          {calculateReturns(stakeAmount, selectedDuration.value).annual} {selectedToken.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-400">Total Yield ({selectedDuration.label})</span>
                        <span className="text-cyan-500 font-semibold">
                          {calculateReturns(stakeAmount, selectedDuration.value).total} {selectedToken.symbol}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => router.push('/start-stake')}
                    className="w-full py-3 px-4 bg-zinc-800/30 border border-zinc-700/50 text-zinc-300 rounded-xl text-lg font-semibold transition-all duration-300 hover:border-blue-500/50 flex items-center justify-center gap-2 mb-6"
                  >
                    <ArrowLeftIcon className="h-5 w-5" />
                    Back to Farms
                  </button>

                  <AnimatePresence>
                    {showSuccess && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
                      >
                        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800/50 max-w-md w-full mx-4">
                          <div className="flex flex-col items-center text-center">
                            <CheckCircleIcon className="h-16 w-16 text-green-500 mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Success!</h3>
                            <p className="text-zinc-400">
                              {stakeAmount} {selectedToken.symbol} successfully staked for {selectedDuration.label}
                            </p>
                            {/* <p className="text-zinc-500 text-sm mt-2">Redirecting in 10 seconds...</p> */}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={handleConfirmStake}
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
