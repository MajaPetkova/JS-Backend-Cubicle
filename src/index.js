const express = require('express');
const cookieParser= require('cookie-parser');

const { initializedatabase } = require('./config/database')

const routes = require('./routes');

const app = express();
require('./config/handlebars')(app);
app.use('/static', express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(routes);

initializedatabase()
    .then(() => {
        app.listen(5000, () => console.log('App is started on port 5000'))

    })
    .catch((err) => {
        console.log('Can not conect to db:', err)
    })