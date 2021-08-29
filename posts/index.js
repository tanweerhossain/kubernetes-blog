const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.options('/*', (req, res, next) => {
    res.sendStatus(200);
});

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts/create', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;

    posts[id] = {
        id,
        title
    };
    
    // Event-Bus Service
    await axios.post('http://event-bus-clusterip-srv:4005/events', {
        type: 'POST-CREATED',
        data: {
            id,
            title
        }
    });

    res.status(201).send(posts[id]);
});


app.post('/events', (req, res) => {
    console.log('Event Received: ', req.body.type);

    res.sendStatus(200);
});

app.listen(4000, () => {
    console.log('Post Service Listening on 4000!');
})