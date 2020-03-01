import React from 'react';
import { ThemeProvider } from "./ThemeProvider";
import { UserProvider } from "./UserProvider";


export const Providers:React.FC = ({ children }) => {
    return (
        <ThemeProvider>
            <UserProvider>
            { children }
            </UserProvider>
        </ThemeProvider>
    );
}
