import * as React from 'react';
import { Layout } from './components/Layout';
import { IdeaInput } from './components/Idealnput'; // Ensure the file './components/IdeaInput.tsx' exists
import { ResultsContainer } from './components/ResultsContainer';
import { InspirationSidebar } from './components/InspirationSidebar';
import { StartupContextProvider } from './context/StartupContext';

function App() {
  return (
    <StartupContextProvider>
      <div className="flex min-h-screen bg-gray-50">
        <InspirationSidebar />
        <div className="flex-1 flex flex-col">
          <Layout>
            <>
              <IdeaInput />
              <ResultsContainer />
            </>
          </Layout>
        </div>
      </div>
    </StartupContextProvider>
  );
}

export default App;
