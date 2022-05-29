const express = require('express');

const app = express();
app.use('/static', express.static('public'));


app.get('/', (req, res) => {
    res.send('hello')
});

app.listen(5000, () => console.log('App is started on port 5000'))