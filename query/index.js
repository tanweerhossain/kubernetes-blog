const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const posts = {};
const handleEvent = async function ({ type, data }) {
    switch (type) {
        case 'COMMENT-CREATED': {
            const { id, postId, content, status } = data;

            if (posts[postId]) {
                posts[postId].comments.push({ id, content, status });
            }

            break;
        }
        case 'POST-CREATED': {
            const { id, title } = data;

            posts[id] = {
                id,
                title,
                comments: []
            };

            break;
        }
        case 'COMMENT-UPDATED': {
            const { id, postId, content, status } = data;

            const comment = posts[postId].comments.find(e => e.id === id);

            comment.status = status;
            comment.content = content;

            break;
        }
    }
};

app.use(bodyParser.json());
app.use(cors());

app.options('/*', (req, res, next) => {
    res.sendStatus(200);
});

app.post('/events', (req, res) => {
    console.log('Event Received: ', req.body.type);

    handleEvent(req.body);

    res.sendStatus(200);
});

app.get('/posts', (req, res) => {
    res.status(200).send(posts);
});

app.listen(4002, async () => {
    console.log('Query Service Listening on 4002!');
    try {
        const events = await axios.get('http://event-bus-clusterip-srv:4005/events')
            .catch(err => []);

        for (const event of events.data) {
            handleEvent(event);
        }
    } catch(err) {
        console.error(err.message);
    }
});