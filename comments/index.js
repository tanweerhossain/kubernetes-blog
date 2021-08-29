const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'PENDING' });

    commentsByPostId[req.params.id] = comments;
    
    // Event-Bus Service
    await axios.post('http://event-bus-clusterip-srv:4005/events', {
        type: 'COMMENT-CREATED',
        data: {
            id: commentId,
            postId: req.params.id,
            content,
            status: 'PENDING'
        }
    });

    res.status(201).send(commentsByPostId[req.params.id]);
});

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    switch (type) {
        case 'COMMENT-MODERATED': {
            const { id, postId, status } = data;
            
            const comment = commentsByPostId[postId]
                                .find(e => e.id === id);
            
            comment.status = status;

            await axios.post('http://event-bus-clusterip-srv:4005/events', {
                type: 'COMMENT-UPDATED',
                data
            });

            break;
        }
    }

    res.sendStatus(200);
});

app.listen(4001, () => {
    console.log('Comment Service Listening on 4001!');
})