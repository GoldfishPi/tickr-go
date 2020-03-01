import React, { useContext, useEffect } from "react";
import { 
    Layout, 
    List, 
    ListItem, 
    Icon
} from "@ui-kitten/components"
import { AlertsContext } from "../providers/AlertsProvider";

const renderItem = ({ item }) => (
    <ListItem 
        icon={ item.is_triggered ? styles => (<Icon {...styles} name="alert-circle" fill="red" />) : null }
        title={ item.name } 
    />
);

export const AlertsScreen = () => {
    const { alerts, fetchAlerts } = useContext(AlertsContext);

    useEffect(() => {
        fetchAlerts();
    }, []);

    return (<>
        <Layout style={{flex:1}}>
            <List
                data={alerts}
                renderItem={renderItem}
            />
        </Layout>
    </>)
}
