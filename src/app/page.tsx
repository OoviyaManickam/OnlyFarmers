import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { BoxReveal } from '@/components/magicui/box-reveal';
import { TypingAnimation } from '@/components/magicui/typing-animation';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-black/0 to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-black/0 to-transparent"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Gradient Circle */}
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl animate-pulse"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-transparent rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-gradient-to-l from-cyan-500/10 to-transparent rounded-full blur-2xl animate-float-slower"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_70%)] opacity-20"></div>
      </div>

      <div className="relative flex flex-col min-h-screen">
        <Navbar />
        <div className="container p-25 mx-auto px-6 lg:px-8 flex-grow">
          <div className="pt-32 lg:pt-50 pb-40 flex flex-col items-center text-center gap-8 relative">
            {/* Spotlight Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-full blur-3xl opacity-50 animate-spotlight"></div>
            
            {/* Geometric Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-20 h-20 border border-blue-500/20 rounded-lg transform rotate-45 animate-float"></div>
              <div className="absolute top-40 right-20 w-16 h-16 border border-cyan-500/20 rounded-full animate-float-slow"></div>
              <div className="absolute bottom-20 left-1/4 w-24 h-24 border border-purple-500/20 transform rotate-12 animate-float-slower"></div>
            </div>

            <BoxReveal boxColor="#000" duration={0.7}>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text font-space-grotesk relative">
                OnlyFarmers
              </h1>
            </BoxReveal>
            
            <BoxReveal boxColor="#111" duration={0.8}>
              <p className="text-xl md:text-2xl lg:text-3xl text-zinc-400 font-space-grotesk tracking-wider relative">
                BTCFi - AI - ZKP - CORE
              </p>
            </BoxReveal>
            
            <BoxReveal boxColor="#222" duration={0.9} width="100%">
              <p className="max-w-3xl mx-auto text-lg md:text-xl text-zinc-300 leading-relaxed font-space-grotesk relative">
                Powered by DePIN to Farm. Stake. Earn. No Hassle. 
                <span className="block mt-2">
                  Turning real-time farm data into smart investments - where crops grow, profits flow, and Web3 complexity stays out of sight!
                </span>
              </p>
            </BoxReveal>
            
            <BoxReveal boxColor="#000" duration={1}>
              <button className="mt-4 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-black rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 font-space-grotesk tracking-wide relative">
                Get Started
              </button>
            </BoxReveal>
          </div>

          <div className="py-20 ">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text font-space-grotesk">
              Key Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group relative bg-gradient-to-br from-zinc-900/50 to-black p-8 rounded-2xl border border-zinc-800/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative">
                  <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-space-grotesk">PiCompute to help you up your staking game</h3>
                  <p className="text-zinc-400 font-space-grotesk leading-relaxed">
                    An integral part of our platform — an AI-powered engine that crunches real-time sensor data to predict crop health, yield potential, and risks.
                  </p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-zinc-900/50 to-black p-8 rounded-2xl border border-zinc-800/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative">
                  <div className="h-12 w-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-space-grotesk"> Stake on Real Farms, Not Just Tokens</h3>
                  <p className="text-zinc-400 font-space-grotesk leading-relaxed">
                    Our PiAgent handles the Web3 complexity so you can focus oForget speculative DeFi. With our platform, you stake directly on real-world farms using live sensor data, turning your crypto into a force for sustainable growth.n growing and earning!
                  </p>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-zinc-900/50 to-black p-8 rounded-2xl border border-zinc-800/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                <div className="relative">
                  <div className="h-12 w-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 font-space-grotesk">ZK-Proofs to verify your identity without compromise</h3>
                  <p className="text-zinc-400 font-space-grotesk leading-relaxed">
                    Stay private, stay secure! With Zero-Knowledge Proofs, users can verify their identity without revealing personal data—ensuring trust, compliance, and seamless access.
                  </p>
                </div>

              </div>
            </div>

          </div>

          {/* New Insight Section */}
          <div className="pt-6 pb-20 relative">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-purple-500/10 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black_70%)]"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left Side - Typing Animation */}
                <div className="relative">
                  <div className="absolute -top-20 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
                  <TypingAnimation
                    className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text"
                    duration={50}
                    delay={0.5}
                  >
                    Stake Smarter with Real Farm Insights
                  </TypingAnimation>
                  <p className="mt-6 text-lg text-zinc-400 font-space-grotesk leading-relaxed">
                    Get real-time insights and analytics to make informed staking decisions. Our platform provides comprehensive data visualization and farm health metrics.
                  </p>
                </div>

                {/* Right Side - 3D Card */}
                <div className="relative">
                  <CardContainer className="w-full">
                    <CardBody className="w-full">
                      <CardItem
                        translateZ={50}
                        className="w-full bg-gradient-to-br from-zinc-900/90 to-black/90 p-8 rounded-2xl border border-zinc-800/50 backdrop-blur-sm"
                      >
                        <div className="space-y-6">
                          {/* Card Header */}
                          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text">
                            Does this look like an opportunity?
                          </h3>

                          {/* Farm Stats Grid */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-zinc-800/30 p-4 rounded-xl">
                              <p className="text-zinc-400 text-sm">Max Yield</p>
                              <p className="text-2xl font-bold text-blue-500">24.5%</p>
                            </div>
                            <div className="bg-zinc-800/30 p-4 rounded-xl">
                              <p className="text-zinc-400 text-sm">Farmer ID</p>
                              <p className="text-lg font-medium text-cyan-500">#FARM-2024</p>
                            </div>
                            <div className="bg-zinc-800/30 p-4 rounded-xl">
                              <p className="text-zinc-400 text-sm">PiCore ID</p>
                              <p className="text-lg font-medium text-purple-500">#PC-7890</p>
                            </div>
                            <div className="bg-zinc-800/30 p-4 rounded-xl">
                              <p className="text-zinc-400 text-sm">Farm Health</p>
                              <p className="text-lg font-medium text-green-500">Excellent</p>
                            </div>
                          </div>

                          {/* Growth Graph */}
                          <div className="bg-zinc-800/30 p-4 rounded-xl">
                            <p className="text-zinc-400 text-sm mb-2">Growth Trend</p>
                            <div className="h-32 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 rounded-lg relative overflow-hidden">
                              {/* Simulated Graph Line */}
                              <div className="absolute inset-0">
                                <svg className="w-full h-full" viewBox="0 0 100 50" preserveAspectRatio="none">
                                  <path
                                    d="M0,50 Q10,40 20,45 T40,30 T60,35 T80,20 T100,25"
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
                          </div>

                          {/* Stake Button */}
                          <button className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-black rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                            Stake
                          </button>
                        </div>
                      </CardItem>
                    </CardBody>
                  </CardContainer>
                </div>
              </div>
            </div>
          </div>

          
        </div>
        <Footer />
      </div>
    </main>
  );
}
