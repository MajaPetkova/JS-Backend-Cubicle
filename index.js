const express = require('express');
const cookieParser = require('cookie-parser');

const { initializedatabase } = require('./src/config/database')
const { auth } = require('./src/middlewares/authMiddleware')
const routes = require('./src/routes');

const app = express();
require('./src/config/handlebars')(app);
app.use('/static', express.static('public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))
app.use(auth);
app.use(routes);

initializedatabase()
    .then(() => {
        app.listen(5000, () => console.log('App is started on port 5000'))

    })
    .catch((err) => {
        console.log('Can not connect to db:', err)
    })