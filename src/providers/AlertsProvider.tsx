import React from 'react';
import { UserContext } from "./UserProvider";
import { api } from "../api";

interface AlertsState {
    alerts:any[];
    fetchAlerts:() => Promise<any>;
}

export const AlertsContext = React.createContext<AlertsState>({
    alerts:[],
    fetchAlerts:async () => null
});

export const AlertsProvider:React.FC = ({ children }) => {
    const [ alerts, setAlerts ] = React.useState([]);
    const { user } = React.useContext(UserContext);

    const state = {
        alerts,
        async fetchAlerts() {
            const msid = user.user.marketspaces[0].id;

            const alerts = await api.get(`/email-alert/${msid}`);
            const active = alerts.data
                .filter((a:any) => a.is_active);

            setAlerts([
                ...active.filter((a:any) => a.is_triggered),
                ...active.filter((a:any) => !a.is_triggered)
            ])
        }
    }

    return (
        <AlertsContext.Provider
            value={ state }
        >
            { children }
        </AlertsContext.Provider>
    );
}
