"use client";

import { useState, useEffect } from "react";
import { Paintbrush, ArrowLeft, Sun, Moon } from "lucide-react";
import Link from 'next/link';
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const themes = [
    { name: 'Default', primary: '240 6% 10%', background: { light: '0 0% 100%', dark: '240 5% 4%' } },
    { name: 'Crimson', primary: '0 84% 60%', background: { light: '0 29% 87%', dark: '0 20% 8%' } },
    { name: 'Emerald', primary: '142 76% 36%', background: { light: '140 29% 87%', dark: '140 20% 8%' } },
    { name: 'Cobalt', primary: '221 83% 53%', background: { light: '220 29% 87%', dark: '220 20% 8%' } },
    { name: 'Amber', primary: '48 96% 59%', background: { light: '45 29% 87%', dark: '45 20% 8%' } },
    { name: 'Tangerine', primary: '25 95% 53%', background: { light: '24 29% 87%', dark: '24 20% 8%' } },
];

const colors = themes.map(theme => ({
    name: theme.name,
    value: theme.primary,
    ring: `hsl(${theme.primary})`,
    background: theme.background
}));


export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeColor, setActiveColor] = useState(colors[0].value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedThemeName = localStorage.getItem('appTheme') || 'Default';
    const savedTheme = themes.find(t => t.name === savedThemeName) || themes[0];
    const root = document.documentElement;
    
    root.style.setProperty('--primary', savedTheme.primary);
    
    const isDark = document.body.classList.contains('dark');
    const bg = isDark ? savedTheme.background.dark : savedTheme.background.light;
    const [hue] = bg.split(" ");
    root.style.setProperty('--background-hue', hue);

    setActiveColor(savedTheme.primary);
  }, [theme]);

  const handleThemeChange = (themeName: string) => {
    const selectedTheme = themes.find(t => t.name === themeName) || themes[0];
    const root = document.documentElement;

    localStorage.setItem('appTheme', themeName);

    root.style.setProperty('--primary', selectedTheme.primary);

    const isDark = document.body.classList.contains('dark');
    const bg = isDark ? selectedTheme.background.dark : selectedTheme.background.light;
    const [hue] = bg.split(" ");
    root.style.setProperty('--background-hue', hue);
    
    setActiveColor(selectedTheme.primary);
  };

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
        <div className="flex items-center gap-4 mb-4">
            <Button asChild variant="ghost" size="icon">
                <Link href="/profile">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
            </Button>
            <h1 className="text-3xl font-bold font-headline">Settings</h1>
        </div>
        
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Paintbrush className="h-6 w-6" />
            <div>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the app.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Theme</h3>
            <div className="flex gap-2">
              <Button variant={theme === 'light' ? 'default' : 'outline'} onClick={() => setTheme('light')}>
                  <Sun className="mr-2" /> Light
              </Button>
              <Button variant={theme === 'dark' ? 'default' : 'outline'} onClick={() => setTheme('dark')}>
                  <Moon className="mr-2" /> Dark
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Accent Color</h3>
            <div className="flex flex-wrap gap-3">
              {colors.map((color) => (
                <button
                  key={color.name}
                  aria-label={`Set accent color to ${color.name}`}
                  onClick={() => handleThemeChange(color.name)}
                  className={cn(
                    "h-10 w-10 rounded-full border-2 transition-transform hover:scale-110",
                    activeColor === color.value ? 'border-foreground' : 'border-transparent'
                  )}
                  style={{ backgroundColor: color.ring }}
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
