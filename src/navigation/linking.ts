
import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function(containerRef:any) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Login: 'login',
          Alerts: 'alerts',
        },
      },
    },
  });
}
