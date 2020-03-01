import React from 'react';

type Themes = 'light' | 'dark';
export const ThemeContext = React.createContext<{
    theme:Themes
    setTheme:(theme:Themes) => void
}>({
    theme:'dark',
    setTheme:() => null
});

export const ThemeProvider:React.FC = ({ children }) => {
    const [ theme, setTheme ] = React.useState<Themes>('dark');
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            { children }
        </ThemeContext.Provider>
    )
}
