import axios from 'axios';
import { nconf } from '../conf';

export const getPosts = async () =>
    await axios.get(`${nconf.get('QUERY-SERVICE-URL')}/posts`)
        .then(response => response?.data);