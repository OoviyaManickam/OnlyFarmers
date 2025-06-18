"use client";

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useState } from 'react';

const dummyWallet = '0x1234...ABCD5678';
const dummyProfile = {
  joined: '2024-05-01',
};
const dummyStakes = [
  {
    id: 'stake1',
    farm: 'Farm #101',
    token: 'ETH',
    amount: 2.5,
    apy: 12.5,
    status: 'Active',
    date: '2024-06-01T14:30:00Z',
    duration: '6 Months',
    yield: 0.8,
    penalty: 10,
    details: {
      piCoreId: 'PC-101',
      health: 'Good',
      yieldScore: 92,
      maxYield: 15,
      lockPeriod: '180 days',
      withdrawalFee: '10.0%',
    },
  },
  {
    id: 'stake2',
    farm: 'Farm #202',
    token: 'USDT',
    amount: 1000,
    apy: 8.2,
    status: 'Active',
    date: '2024-05-15T09:00:00Z',
    duration: '3 Months',
    yield: 20,
    penalty: 10,
    details: {
      piCoreId: 'PC-202',
      health: 'Excellent',
      yieldScore: 88,
      maxYield: 10,
      lockPeriod: '90 days',
      withdrawalFee: '10.0%',
    },
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString();
}

export default function ProfilePage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [withdrawStake, setWithdrawStake] = useState<string | null>(null);

  // Dummy logout handler
  const handleLogout = () => {
    alert('Logged out!');
  };

  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Visible neon background effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Large neon gradients */}
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-gradient-to-br from-blue-600 via-cyan-400 to-purple-600 opacity-60 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 opacity-50 rounded-full blur-[100px]"></div>
        {/* Neon grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,255,255,0.08)_1px,transparent_1px),linear-gradient(180deg,rgba(0,255,255,0.08)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        {/* Subtle center glow */}
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-[700px] h-[200px] bg-gradient-to-r from-blue-500/30 via-cyan-400/20 to-purple-500/30 rounded-full blur-2xl opacity-70"></div>
      </div>
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 lg:px-8 pb-20 pt-18 flex-grow">
          <div className="pt-20 max-w-3xl mx-auto">
            {/* Profile Card - new style, no avatar, just Hello! and info */}
            <div className="bg-gradient-to-br from-blue-900/70 via-black/80 to-purple-900/60 border-2 border-blue-700/30 rounded-3xl p-8 mb-10 shadow-2xl flex flex-col md:flex-row md:items-center gap-8 relative overflow-hidden">
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl md:text-4xl font-bold text-white font-space-grotesk">Hello!</span>
                  </div>
                </div>
                <div className="text-zinc-400 text-sm mt-2">Wallet Address</div>
                <div className="font-mono text-lg text-blue-300 bg-zinc-900/60 px-2 py-1 rounded-lg inline-block mt-1 border border-blue-700/40">
                  {dummyWallet}
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4">
                  <div className="text-zinc-400 text-sm">Joined: <span className="text-zinc-200">{dummyProfile.joined}</span></div>
                  <div className="text-zinc-400 text-sm">Total Staked: <span className="text-blue-300 font-semibold">{dummyStakes.reduce((a, s) => a + s.amount, 0)}</span></div>
                  <button onClick={handleLogout} className="px-6 py-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 text-black font-bold rounded-full shadow-lg hover:scale-105 transition-all border-2 border-blue-700/30 mt-2 md:mt-0">Logout</button>
                </div>
              </div>
            </div>

            {/* Stakes Dashboard */}
            <div className="bg-black/60 border border-zinc-800/60 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 font-space-grotesk">Your Stakes</h2>
              <div className="space-y-4">
                {dummyStakes.map((stake) => (
                  <div key={stake.id} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 cursor-pointer" onClick={() => setExpanded(expanded === stake.id ? null : stake.id)}>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">{stake.token === 'ETH' ? '🔷' : stake.token === 'USDT' ? '💵' : '🪙'}</span>
                        <div>
                          <div className="font-semibold text-white">{stake.farm}</div>
                          <div className="text-zinc-400 text-xs">{stake.token} • {stake.amount} • {stake.status}</div>
                        </div>
                      </div>
                      <div className="text-zinc-400 text-xs md:text-sm">{formatDate(stake.date)}</div>
                    </div>
                    {expanded === stake.id && (
                      <div className="mt-4 border-t border-zinc-800 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-zinc-400 text-xs">APY</div>
                            <div className="text-blue-400 font-semibold">{stake.apy}%</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 text-xs">Duration</div>
                            <div className="text-zinc-200">{stake.duration}</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 text-xs">Yield Score</div>
                            <div className="text-purple-400 font-semibold">{stake.details.yieldScore}</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 text-xs">Farm Health</div>
                            <div className="text-cyan-400 font-semibold">{stake.details.health}</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 text-xs">Max Yield</div>
                            <div className="text-blue-400 font-semibold">{stake.details.maxYield}%</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 text-xs">Lock Period</div>
                            <div className="text-zinc-200">{stake.details.lockPeriod}</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 text-xs">Withdrawal Fee</div>
                            <div className="text-zinc-200">{stake.details.withdrawalFee}</div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          <div className="text-zinc-400 text-xs">Staked on: <span className="text-zinc-200">{formatDate(stake.date)}</span></div>
                          <button onClick={() => setWithdrawStake(stake.id)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-all">Withdraw</button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {dummyStakes.length === 0 && (
                  <div className="text-zinc-400 text-center py-8">No stakes found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Withdraw Modal */}
      {withdrawStake && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="text-2xl text-red-500 font-bold mb-2">Warning!</div>
            <div className="text-zinc-300 mb-4">You will get penalised by <span className="font-bold text-red-400">10%</span>.</div>
            <button onClick={() => setWithdrawStake(null)} className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-black rounded-xl text-lg font-semibold transition-all duration-300 mb-2">Proceed</button>
            <button onClick={() => setWithdrawStake(null)} className="w-full py-2 px-4 text-zinc-400 hover:text-white transition-all">Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
}
