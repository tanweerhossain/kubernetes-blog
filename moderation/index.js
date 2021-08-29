const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    switch (type) {
        case 'COMMENT-CREATED': {
            const status = data.content.toLowerCase().includes('orange')
                            ? 'REJECTED'
                            : 'ACCEPTED';
            if (status) {
                await axios.post('http://event-bus-clusterip-srv:4005/events', {
                    type: 'COMMENT-MODERATED',
                    data: {
                        ...data,
                        status
                    }
                });
            }
            break;
        }
    }
    
    res.sendStatus(200);
});

app.listen(4003, () => {
    console.log('Comment Moderation Service Listening on 4003!');
}); 