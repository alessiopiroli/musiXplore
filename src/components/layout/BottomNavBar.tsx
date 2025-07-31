
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Trophy, Users, User, Library } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/library', label: 'Library', icon: Library },
  { href: '/leaderboards', label: 'Leaderboards', icon: Trophy },
  { href: '/communities', label: 'Communities', icon: Users },
  { href: '/profile', label: 'Profile', icon: User },
];

export function BottomNavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-1 flex-col items-center justify-center gap-1 p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary',
              (pathname === item.href) ? 'text-primary' : ''
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
