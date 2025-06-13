'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Stake', href: '/stake' },
  { name: 'Profile', href: '/profile' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Disclosure as="nav" className="fixed w-full z-50 top-0 bg-black border-b border-zinc-800">
      {({ open }) => (
        <>
          <div className="mx-auto px-6 lg:px-8">
            <div className="flex h-20 justify-between items-center">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center">
                  <span className="text-4xl font-black bg-gradient-to-r from-blue-500 via-cyan-600 to-purple-500 text-transparent bg-clip-text hover:from-blue-400 hover:via-cyan-500 hover:to-purple-400 transition-all duration-300">
                    OF
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex sm:items-center">
                <div className="flex items-center space-x-20">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium text-zinc-400 hover:text-blue-500 transition-colors duration-200 font-space-grotesk tracking-wide"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <button className="ml-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-400 hover:to-cyan-500 text-black px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 font-space-grotesk tracking-wide">
                    Connect Wallet
                  </button>
                </div>
              </div>

              {/* Mobile menu button */}
              <div className="flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-3 text-zinc-400 hover:text-blue-500 focus:outline-none">
                  <div className="sr-only">Open main menu</div>
                  {open ? (
                    <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile menu panel */}
          <Disclosure.Panel className="sm:hidden bg-black border-t border-zinc-800">
            <div className="px-4 py-3 space-y-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  href={item.href}
                  className="text-zinc-400 hover:text-blue-500 block px-4 py-3 text-lg font-medium w-full text-left transition-colors duration-200 font-space-grotesk"
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <button className="w-full mt-4 bg-blue-500 hover:bg-blue-400 text-black px-4 py-3 text-lg font-semibold transition-all duration-200 font-space-grotesk">
                Connect Wallet
              </button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
