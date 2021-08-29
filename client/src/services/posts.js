import axios from 'axios';
import { nconf } from '../conf';

export const savePosts = async (title) =>
    await axios.post(`${nconf.get('POST-SERVICE-URL')}/posts/create`, { title });

export const getPosts = async () =>
    await axios.get(`${nconf.get('POST-SERVICE-URL')}/posts`)
        .then(response => response?.data);