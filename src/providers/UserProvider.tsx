import React from 'react';
import { api } from '../api';
import sjcl from 'sjcl';
import pcrypt from '../lib/pcrypt';
import { AsyncStorage } from "react-native";

type User = null | any;

interface UserState {
    user:User;
    login:(username:string, password:string, client:string) => Promise<void>;
    loginToken:() => Promise<void>;
    logout:() => void;
}

export const UserContext = React.createContext<UserState>({
    user:null,
    login:async () => null,
    loginToken: async() => null,
    logout: () => null,
});

export const UserProvider:React.FC = ({ children }) => {

    const [ user, setUser ] = React.useState<User>(null);

    const state:UserState = {
        user:user,
        async login(username, password, client) {

            const saltRes = await api.get(`users/${username}/salt`);
            let salt_str:string = saltRes.data;

            var split = salt_str.split(":");
            var iter = parseInt(split[0]);
            var salt_base64 = split[1];

            var passbits = sjcl.codec.utf8String.toBits(
                pcrypt.to_utf8(password)
            );
            var salt = sjcl.codec.base64.toBits(salt_base64);
            let res = pcrypt.pbkdf2(passbits, salt, iter, 64);

            res = sjcl.codec.base64.fromBits(res);

            try {
                const auth = pcrypt.gen_auth(username, res);
                api.defaults.headers.common["Authorization"] = auth;
                var login = await api.post(
                    `/users/auth/full?domain=${client}`
                );
                api.defaults.headers.common["Authorization"] = pcrypt
                    .to_base64(login.data.user.token);

                AsyncStorage.setItem('token', login.data.user.token);
                AsyncStorage.setItem('client', client); 

                setUser(login);
            } catch (error) {
                console.error(error);
            }

        },
        async loginToken() {

            const [token, client] = await Promise.all([
                AsyncStorage.getItem('token'),
                AsyncStorage.getItem('client')
            ]);

            if(!token || !client)return;

            try {
                api.defaults.headers.common["Authorization"] = pcrypt
                    .gen_auth(token);

                const login = await api
                    .post(`/users/auth/full?token=1&domain=${client}`,);

                setUser(login.data);
            } catch(e) {
            }
        },
        logout() {
            AsyncStorage.removeItem('token');
            setUser(null);
        }
    }

    return (
        <UserContext.Provider
            value={ state }>
            { children }
        </UserContext.Provider>
    );
}

