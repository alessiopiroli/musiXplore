
"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

const themes = [
    { name: 'Default', primary: '240 6% 10%', background: { light: '0 0% 100%', dark: '240 5% 4%' } },
    { name: 'Crimson', primary: '0 84% 60%', background: { light: '0 29% 87%', dark: '0 20% 8%' } },
    { name: 'Emerald', primary: '142 76% 36%', background: { light: '140 29% 87%', dark: '140 20% 8%' } },
    { name: 'Cobalt', primary: '221 83% 53%', background: { light: '220 29% 87%', dark: '220 20% 8%' } },
    { name: 'Amber', primary: '48 96% 59%', background: { light: '45 29% 87%', dark: '45 20% 8%' } },
    { name: 'Tangerine', primary: '25 95% 53%', background: { light: '24 29% 87%', dark: '24 20% 8%' } },
];

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  React.useEffect(() => {
    const savedThemeName = localStorage.getItem('appTheme') || 'Default';
    const savedTheme = themes.find(t => t.name === savedThemeName) || themes[0];
    const root = document.documentElement;
    const isDark = document.body.classList.contains('dark');

    const newPrimary = savedTheme.primary;
    const newBackground = isDark ? savedTheme.background.dark : savedTheme.background.light;
    const [hue] = newBackground.split(' ');

    root.style.setProperty('--primary', newPrimary);
    root.style.setProperty('--background-hue', hue);
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
