import React from 'react';
import {  ApplicationProvider } from '@ui-kitten/components';
import { dark, light, mapping } from '@eva-design/eva';

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
            <ApplicationProvider 
                mapping={mapping} 
                theme={ theme === 'dark' ? dark : light }
            >
            { children }
            </ApplicationProvider>
        </ThemeContext.Provider>
    )
}
