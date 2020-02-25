import axios from 'axios';
import sjcl from 'sjcl';
import pcrypt from '../lib/pcrypt';
import { Platform } from 'react-native';

const devUrl = `http://localhost:3000`;
const prodUrl = `https://apiqa.tickr.com`;

export const api = axios.create({
    baseURL:Platform.OS === 'web' ? devUrl : prodUrl
});


export const authUser = async (
    username:string, 
    password_str:string,
    client:string,
) => {
    const saltRes = await api.get(`users/${username}/salt`);
    let salt_str:string = saltRes.data;

    var split = salt_str.split(":");
    var iter = parseInt(split[0]);
    var salt_base64 = split[1];

    var passbits = sjcl.codec.utf8String.toBits(
        pcrypt.to_utf8(password_str)
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

        return login;
    } catch (error) {
        console.error(error);
        return false;
    }
    // this.$cookies.set('token', login.data.user.token);
}
