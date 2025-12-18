import * as React from 'react';
import { Layout } from './components/Layout';
// FIXED: Typo in filename import
import { IdeaInput } from './components/IdeaInput'; 
import { ResultsContainer } from './components/ResultsContainer';
import { InspirationSidebar } from './components/InspirationSidebar';
import { StartupContextProvider } from './context/StartupContext';

function App() {
  return (
    <StartupContextProvider>
      <div className="flex min-h-screen bg-slate-900 text-slate-50">
        <InspirationSidebar />
        <div className="flex-1 flex flex-col relative z-0">
          <Layout>
            <div className="animate-in fade-in zoom-in duration-500 slide-in-from-bottom-4">
              <IdeaInput />
              <ResultsContainer />
            </div>
          </Layout>
        </div>
      </div>
    </StartupContextProvider>
  );
}

export default App;
