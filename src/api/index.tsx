import axios from 'axios';
import { Platform, AsyncStorage } from 'react-native';

const devUrl = `http://localhost:3000`;
const prodUrl = `https://apiqa.tickr.com`;

export const api = axios.create({
    baseURL:Platform.OS === 'web' ? devUrl : prodUrl
});

