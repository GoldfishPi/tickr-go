import { createContext } from 'react';

type Themes = 'light' | 'dark';
interface props {
    theme:Themes;
    setTheme:(theme:Themes) => void;
}
export const ThemeContext = createContext<props>(null);
