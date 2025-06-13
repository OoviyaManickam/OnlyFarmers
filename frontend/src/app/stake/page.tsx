"use client";

import { motion } from "framer-motion";
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function StakePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black/0 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/0 to-transparent"></div>
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 lg:px-8 p-5 flex-grow">
          {/* Hero Section */}
          <div className="pt-32 lg:pt-40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto relative"
            >
              {/* Spotlight Effect */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
              
              <h1 className="relative text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text mb-6 font-space-grotesk">
              Real Farms. Real Data. Real Returns.
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-space-grotesk tracking-wider">
                Turning real-time farm data into smart investments - where crops grow, profits flow, and Web3 complexity stays out of sight!
              </p>
              <Link href="/start-stake">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mt-8 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-black rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 font-space-grotesk tracking-wide"
                >
                  Start Staking
                </motion.button>
              </Link>
            </motion.div>

            {/* Feature Boxes */}
            <div className="grid md:grid-cols-2 gap-8 mt-15">
              {/* Stake and Yield Box */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gradient-to-br from-zinc-900/50 to-black p-8 rounded-2xl border border-zinc-800/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white font-space-grotesk">Stake with Purpose</h2>
                <p className="text-zinc-400 font-space-grotesk">
                Back real farms with your crypto. Choose a farm, review live sensor data, and stake to support the next harvest—no guesswork, just grounded impact.                </p>
              </motion.div>

              {/* Dual Stake Box */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gradient-to-br from-zinc-900/50 to-black p-8 rounded-2xl border border-zinc-800/50 hover:border-cyan-500/50 transition-all duration-300"
              >
                <div className="h-12 w-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                  <svg
                    className="w-6 h-6 text-cyan-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white font-space-grotesk">Grow with Yield</h2>
                <p className="text-zinc-400 font-space-grotesk">
                As the crops thrive, so does your stake. Yields are shared between farmers and supporters based on real performance ,not speculation.                </p>
              </motion.div>
            </div>

            {/* Statistics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-15 pb-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                {/* Total BTC Deposited */}
                <div className="text-center">
                  <h3 className="text-zinc-400 font-space-grotesk text-lg mb-3">Total Staked</h3>
                  <span className="text-3xl font-bold text-white font-space-grotesk bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text">$18,000</span>
                </div>

                {/* Total Yield Earned */}
                <div className="text-center">
                  <h3 className="text-zinc-400 font-space-grotesk text-lg mb-3">Avg. Yield per Farm</h3>
                  <span className="text-3xl font-bold text-white font-space-grotesk bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text">$5,480</span>
                </div>

                {/* Insurance Coverage Status */}
                <div className="text-center">
                  <h3 className="text-zinc-400 font-space-grotesk text-lg mb-3">Yield Distributed to Stakers</h3>
                  <span className="text-3xl font-bold text-white font-space-grotesk bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text">$2.4M</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
}
