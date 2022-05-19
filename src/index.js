const express = require('express');
const app = express();
const port = 3000;

const db = require('./app/db');
const router = require('./route');
const methodOverride = require('method-override');

//connect db
db.connect();

app.use(methodOverride('_method'));
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(express.static('./src/public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');


router(app);

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));