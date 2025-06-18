"use client";

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useState } from 'react';

const dummyWallet = '0x1234...ABCD5678';
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

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black/0 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/0 to-transparent"></div>
      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <div className="container mx-auto px-6 lg:px-8 pb-20 flex-grow">
          <div className="pt-10 max-w-3xl mx-auto">
            <div className="bg-black/60 border border-zinc-800/60 rounded-2xl p-8 mb-10 shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text mb-2 font-space-grotesk">Hello</h1>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <div className="text-zinc-400 text-sm">Wallet Address</div>
                  <div className="font-mono text-lg text-blue-400">{dummyWallet}</div>
                </div>
                <div className="flex flex-col gap-1 text-zinc-400 text-sm md:text-right">
                  <div>Joined: <span className="text-zinc-200">2024-05-01</span></div>
                  <div>Total Staked: <span className="text-blue-400 font-semibold">{dummyStakes.reduce((a, s) => a + s.amount, 0)} </span></div>
                </div>
              </div>
            </div>

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
