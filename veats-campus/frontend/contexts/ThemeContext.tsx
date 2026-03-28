// VEats — Theme Context (Dark / Light mode)
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeCtx {
    theme: Theme;
    toggleTheme: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeCtx>({
    theme: 'dark',
    toggleTheme: () => { },
    isDark: true,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('veats_theme') as Theme | null;
        if (saved === 'light' || saved === 'dark') {
            setTheme(saved);
        }
    }, []);

    // Apply to DOM
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('veats_theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDark: theme === 'dark' }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => useContext(ThemeContext);
