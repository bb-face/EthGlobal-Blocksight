'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export type Dao = {
  id: string;
  name: string;
  logoUrl: string;
  chain: string;
  contractAddress: string;
};

interface DaoCardProps {
  dao: Dao;
}

export function DaoCard({ dao }: DaoCardProps) {
  return (
    <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm hover:border-blue-500/50 transition-all flex flex-col">
      <CardHeader className="flex flex-row items-center gap-4">
        <Image src={dao.logoUrl} alt={`${dao.name} logo`} width={48} height={48} className="rounded-full" />
        <div>
          <CardTitle className="text-white">{dao.name}</CardTitle>
          <CardDescription>{dao.chain}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-xs text-gray-500 font-mono break-all">{dao.contractAddress}</p>
      </CardContent>
      <CardFooter>
        <Link href={`/dao/dashboard?address=${dao.contractAddress}`} legacyBehavior>
          <a className="w-full">
            <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              View Intelligence
            </Button>
          </a>
        </Link>
      </CardFooter>
    </Card>
  );
}