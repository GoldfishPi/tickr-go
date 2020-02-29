
import { api } from '../';
export const fetchAlerts = async (user:any) => {
    const msid = user.user.marketspaces[0].id;
    console.log('fetching alerts lol');
    try {
        const alerts = await api.get(`/email-alert/${msid}`);
        return alerts.data.filter((a:any) => a.is_active);
    } catch(e) {
        console.log('failed lol', e);
    }
}
