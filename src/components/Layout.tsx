import React, { ReactNode } from 'react';
import { Rocket } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Rocket className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">Startup Co-Pilot</span>
            </div>
            <nav className="flex space-x-4">
              <a href="/" className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium">
                Home
              </a>
              <a href="#about" className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-500 px-3 py-2 text-sm font-medium">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center">
              <Rocket className="h-6 w-6 text-blue-500" />
              <span className="ml-2 text-sm font-semibold text-gray-900">Startup Co-Pilot</span>
            </div>
            <div className="mt-4 sm:mt-0">
              <p className="text-sm text-gray-500">© 2025 Startup Co-Pilot. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};