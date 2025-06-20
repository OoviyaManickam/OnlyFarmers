"use client";

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { useState, useEffect } from 'react';
import { createWalletClient, custom, createPublicClient, http, isAddress } from 'viem';
import { Contract_ABI, Contract_Address } from '@/components/abi';
import { mantleSepoliaTestnet } from 'viem/chains';

declare global {
  interface Window {
    ethereum?: import('viem').EIP1193Provider;
  }
}

type StakeInfo = {
  farmId: bigint;
  farmName: string;
  amount: bigint;
  startTime: bigint;
  duration: bigint;
  withdrawn: boolean;
};

export default function ProfilePage() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [withdrawStake, setWithdrawStake] = useState<number | null>(null);
  const [wallet, setWallet] = useState<string | null>(null);
  const [stakes, setStakes] = useState<StakeInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [withdrawing, setWithdrawing] = useState(false);

  // Connect wallet and fetch stakes
  useEffect(() => {
    const fetchStakes = async () => {
      setIsLoading(true);
      setError(null);
      try {
        if (typeof window === 'undefined' || !window.ethereum) {
          setError('Please connect your wallet.');
          setIsLoading(false);
          return;
        }

        // Validate contract address
        if (!Contract_Address || !isAddress(Contract_Address)) {
          setError('Invalid contract address configuration.');
          setIsLoading(false);
          return;
        }

        const walletClient = createWalletClient({
          chain: mantleSepoliaTestnet,
          transport: custom(window.ethereum as import('viem').EIP1193Provider),
        });
        const [account] = await walletClient.getAddresses();
        setWallet(account);
        const publicClient = createPublicClient({
          chain: mantleSepoliaTestnet,
          transport: http(),
        });
        const data = await publicClient.readContract({
          address: Contract_Address,
          abi: Contract_ABI,
          functionName: 'getUserStakeInfo',
          args: [account],
        });

        // Fetch farm names for each stake
        const stakesWithNames = await Promise.all((data as StakeInfo[]).map(async (stake) => {
          const farmData = await publicClient.readContract({
            address: Contract_Address,
            abi: Contract_ABI,
            functionName: 'farms',
            args: [stake.farmId],
          }) as [bigint, string, string, bigint, bigint, `0x${string}`];
          
          return {
            ...stake,
            farmName: farmData[1], // Farm name is at index 1
          };
        }));
        
        setStakes(stakesWithNames);
      } catch (err) {
        if (typeof err === 'object' && err && 'message' in err) {
          setError((err as { message?: string }).message || 'Failed to fetch stakes.');
        } else {
          setError('Failed to fetch stakes.');
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchStakes();
  }, []);

  const handleWithdraw = async (index: number) => {
    setWithdrawing(true);
    setError(null);
    setTxHash(null);
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        setError('Please connect your wallet.');
        setWithdrawing(false);
        return;
      }
      const walletClient = createWalletClient({
        chain: mantleSepoliaTestnet,
        transport: custom(window.ethereum as import('viem').EIP1193Provider),
      });
      const [account] = await walletClient.getAddresses();
      const hash = await walletClient.writeContract({
        address: Contract_Address,
        abi: Contract_ABI,
        functionName: 'withdraw',
        args: [BigInt(index)],
        account,
        chain: mantleSepoliaTestnet,
      });
      setTxHash(hash);
      setWithdrawStake(null);
      // Optionally, refetch stakes after withdrawal
    } catch (err) {
      if (typeof err === 'object' && err && 'message' in err) {
        setError((err as { message?: string }).message || 'Withdraw failed.');
      } else {
        setError('Withdraw failed.');
      }
    } finally {
      setWithdrawing(false);
    }
  };

  return (
    <main className="min-h-screen  relative overflow-x-hidden">
      {/* Visible neon background effects */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Large neon gradients */}
        <div className="absolute top-[-200px] left-[-200px] w-[300px] h-[600px] bg-gradient-to-br from-blue-600 via-cyan-400 to-purple-600 opacity-30 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-180px] right-[-180px] w-[500px] h-[500px] bg-gradient-to-tr from-purple-600 via-blue-500 to-cyan-400 opacity-50 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-20 h-20 border border-blue-500/20 rounded-lg transform rotate-45 animate-float"></div>
              <div className="absolute top-40 right-20 w-16 h-16 border border-cyan-500/20 rounded-full animate-float-slow"></div>
              <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-purple-500/20 transform rotate-12 animate-float-slower"></div>
            </div>
        {/* Subtle center glow */}
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
                  {wallet ? wallet : 'Not connected'}
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mt-4">
                  <div className="text-zinc-400 text-sm">Total Stakes: <span className="text-blue-300 font-semibold">{stakes.length}</span></div>
                </div>
              </div>
            </div>

            {/* Stakes Dashboard */}
            <div className="bg-black/60 border border-zinc-800/60 rounded-2xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 font-space-grotesk">Your Stakes</h2>
              {isLoading && <div className="text-zinc-400 text-center">Loading stakes...</div>}
              {error && <div className="text-red-500 text-center">{error}</div>}
              <div className="space-y-4">
                {stakes.map((stake, idx) => (
                  <div key={idx} className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 cursor-pointer" onClick={() => setExpanded(expanded === idx ? null : idx)}>
                      <div className="flex items-center gap-4">
                        <span className="text-2xl">🪙</span>
                        <div>
                          <div className="font-semibold text-white">{stake.farmName}</div>
                          <div className="text-zinc-400 text-xs">Amount: {Number(stake.amount) / 1e18} ETH • {stake.withdrawn ? 'Withdrawn' : 'Active'}</div>
                        </div>
                      </div>
                      <div className="text-zinc-400 text-xs md:text-sm">Start: {new Date(Number(stake.startTime) * 1000).toLocaleString()}</div>
                    </div>
                    {expanded === idx && (
                      <div className="mt-4 border-t border-zinc-800 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <div className="text-zinc-400 text-xs">Duration</div>
                            <div className="text-zinc-200">{Number(stake.duration) / (60 * 60 * 24)} days</div>
                          </div>
                          <div>
                            <div className="text-zinc-400 text-xs">Withdrawn</div>
                            <div className="text-cyan-400 font-semibold">{stake.withdrawn ? 'Yes' : 'No'}</div>
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                          <div className="text-zinc-400 text-xs">Staked on: <span className="text-zinc-200">{new Date(Number(stake.startTime) * 1000).toLocaleString()}</span></div>
                          {!stake.withdrawn && (
                            <button onClick={() => setWithdrawStake(idx)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-all">Withdraw</button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {stakes.length === 0 && !isLoading && (
                  <div className="text-zinc-400 text-center py-8">No stakes found.</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Withdraw Modal */}
      {withdrawStake !== null && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center">
            <div className="text-2xl text-red-500 font-bold mb-2">Warning!</div>
            <div className="text-zinc-300 mb-4">You will get penalised by <span className="font-bold text-red-400">10%</span>.</div>
            {txHash && (
              <div className="mb-2">
                <a href={`https://explorer.sepolia.mantle.xyz/tx/${txHash}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">View Transaction: {txHash}</a>
              </div>
            )}
            {withdrawing ? (
              <div className="text-zinc-400 mb-2">Withdrawing...</div>
            ) : (
              <button onClick={() => handleWithdraw(withdrawStake)} className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-black rounded-xl text-lg font-semibold transition-all duration-300 mb-2">Proceed</button>
            )}
            <button onClick={() => setWithdrawStake(null)} className="w-full py-2 px-4 text-zinc-400 hover:text-white transition-all">Cancel</button>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </div>
        </div>
      )}
    </main>
  );
}