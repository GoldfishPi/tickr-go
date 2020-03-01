import React from 'react';
import { IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { Providers } from "./src/providers";
import { Routing } from "./src/routing";

export default function App() {
    return (
        <Providers>
            <IconRegistry icons={EvaIconsPack} />
            <Routing />
        </Providers>
    );
}

