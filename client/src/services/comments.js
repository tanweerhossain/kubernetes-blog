import axios from 'axios';
import { nconf } from '../conf';

export const saveComments = async (postId, content) =>
    await axios.post(`${nconf.get('COMMENT-SERVICE-URL')}/posts/${postId}/comments`, { content });

export const getComments = async (postId) =>
    await axios.get(`${nconf.get('COMMENT-SERVICE-URL')}/posts/${postId}/comments`)
        .then(response => response?.data);