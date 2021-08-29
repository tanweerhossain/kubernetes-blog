const express = require('express');
const path = require('path');

const app = express();

// MIDDLEWARE TO DEFINES A FOLDER FOR THE STATIC FILES
app.use(express.static('build'));

// DEFINES THE MAIN ENTRY POINT
app.get('/*', function(req, res){
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});

app.listen(3000, function(){
    console.log('App web-server listening on port 3000');
});