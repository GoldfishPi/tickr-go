import React, { useState } from 'react';

import { UserContext } from "./user";
import { ThemeContext } from "./theme";

export const GlobalContexts:React.FC = ({ children }) => {
    const [ user, setUser ] = useState(null);
    type themes = 'dark' | 'light';
    const [ theme, setTheme] = useState<themes>('dark');
    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ThemeContext.Provider value={{ theme, setTheme }}>
                { children }
            </ThemeContext.Provider>
        </UserContext.Provider>
    );
}
