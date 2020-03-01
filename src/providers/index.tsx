import React from 'react';
import { ThemeProvider } from "./ThemeProvider";
import { UserProvider } from "./UserProvider";
import { AlertsProvider } from "./AlertsProvider";


export const Providers:React.FC = ({ children }) => {
    return (
        <ThemeProvider>
            <UserProvider>
                <AlertsProvider>
                    { children }
                </AlertsProvider>
            </UserProvider>
        </ThemeProvider>
    );
}
