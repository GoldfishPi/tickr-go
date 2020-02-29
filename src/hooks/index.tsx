import React, { useState } from 'react';
import { UserContext } from "./user";

export const GlobalContexts:React.FC = ({ children }) => {
    const [ user, setUser ] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    );
}
