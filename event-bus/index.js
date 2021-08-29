const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const events = [];

app.use(bodyParser.json());

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    // Post Service
    axios.post('http://posts-clusterip-srv:4000/events', event);
    // Comment Service
    axios.post('http://comments-clusterip-srv:4001/events', event);
    // Query Service
    axios.post('http://query-clusterip-srv:4002/events', event);
    // Moderation Service
    axios.post('http://moderation-clusterip-srv:4003/events', event);

    console.log('Event Emitted for', req.body.type);

    res.sendStatus(200);
});

app.get('/events', (req, res) => {
    res.status(200).send(events);
});

app.listen(4005, () => {
    console.log('Listening on 4005!');
}); 