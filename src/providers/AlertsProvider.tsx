import React from 'react';
import { UserContext } from "./UserProvider";
import { api } from "../api";

export const AlertsContext = React.createContext<{
    alerts:any[];
    fetchAlerts:() => Promise<any>;
}>({
    alerts:[],
    fetchAlerts:async () => null
});

export const AlertsProvider:React.FC = ({ children }) => {
    const [ alerts, setAlerts ] = React.useState([]);
    const { user } = React.useContext(UserContext);
    return (
        <AlertsContext.Provider
            value={{
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
            }}
        >
            { children }
        </AlertsContext.Provider>
    );
}
