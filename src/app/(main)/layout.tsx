"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { BottomNavBar } from '@/components/layout/BottomNavBar';

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const quizCompleted = localStorage.getItem('quizCompleted');
    if (!quizCompleted) {
      router.replace('/quiz');
    } else {
      setIsReady(true);
    }
  }, [router]);

  if (!isReady) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-background p-4">
        <Skeleton className="h-16 w-full" />
        <div className="mt-4 grid flex-grow grid-cols-2 gap-4 w-full">
            <Skeleton className="h-full w-full" />
            <Skeleton className="h-full w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow overflow-y-auto pb-20">{children}</main>
      <BottomNavBar />
    </div>
  );
}
