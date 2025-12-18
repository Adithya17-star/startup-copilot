import React, { ReactNode } from 'react';
import { Rocket, Stars } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black text-white">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-slate-900/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center group cursor-pointer">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-slate-900 rounded-full p-1.5">
                   <Rocket className="h-6 w-6 text-blue-400 group-hover:text-blue-300 transition-colors" />
                </div>
              </div>
              <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                Startup Co-Pilot
              </span>
            </div>
            <nav className="flex space-x-6">
              <a href="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Home</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">Features</a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        
        {children}
      </main>
      
      <footer className="border-t border-white/10 bg-slate-900/50 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-400">
              <Stars className="h-4 w-4" />
              <span className="text-sm">Powered by AI Generation</span>
            </div>
            <div className="mt-4 sm:mt-0">
              <p className="text-sm text-gray-500">© 2025 Startup Co-Pilot. Built for the future.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
