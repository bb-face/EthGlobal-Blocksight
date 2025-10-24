'use client';

import { PlusCircle } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

// Import our new and existing components
import { Button } from '@/components/ui/button';
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty';
import { AddDaoDrawer } from './_components/AddDaoDrawer';
import { DaoCard, type Dao } from './_components/DaoCard';

export default function DaoHomePage() {
  const [daos, setDaos] = useState<Dao[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user's existing DAOs from a database.
    // We start with an empty list to demo the empty state.
    setTimeout(() => {
      setDaos([]); 
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDaoAdded = (newDao: Dao) => {
    setDaos(prevDaos => [...prevDaos, newDao]);
  };

  return (
    <main className="min-h-screen w-full bg-black text-white p-4 sm:p-6 md:p-8">
      <div className="container mx-auto max-w-7xl">
        <header className="flex items-center justify-between py-6 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <Image src="/puck-logo.png" alt="Puck Mascot" width={40} height={40} className="rounded-full" />
            <div>
                <h1 className="text-2xl font-bold text-white">DAO Command Center</h1>
                <p className="text-sm text-gray-400">Your AI-powered community intelligence hub.</p>
            </div>
          </div>
        </header>

        {isLoading ? (
          <div className="text-center text-gray-400 mt-20 animate-pulse">Loading your DAOs...</div>
        ) : daos.length === 0 ? (
          <div className="mt-20">
            <Empty className="border border-dashed border-gray-700 bg-transparent rounded-lg py-12">
              <EmptyHeader>
                <EmptyMedia>
                  <Image src="/puck-logo.png" alt="Puck Mascot" width={80} height={80} className="rounded-full opacity-70" />
                </EmptyMedia>
                <EmptyTitle>Welcome to Your Command Center</EmptyTitle>
                <EmptyDescription>
                  You haven't added any DAOs to analyze yet. Get started by adding your first one.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <AddDaoDrawer onDaoAdded={handleDaoAdded}>
                  <Button size="lg">Add Your First DAO</Button>
                </AddDaoDrawer>
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {daos.map((dao) => (
              <DaoCard key={dao.id} dao={dao} />
            ))}
            {/* "Add New" card in the grid */}
            <AddDaoDrawer onDaoAdded={handleDaoAdded}>
              <button className="flex flex-col items-center justify-center h-full border-2 border-dashed border-gray-700 rounded-lg bg-transparent hover:bg-gray-900/50 hover:border-blue-500/50 transition-all">
                <PlusCircle className="h-12 w-12 text-gray-600 mb-2" />
                <span className="text-gray-400 font-medium">Add New DAO</span>
              </button>
            </AddDaoDrawer>
          </div>
        )}
      </div>
    </main>
  );
}