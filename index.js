const express = require('express');
const expressErrors = require('express-async-errors');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const { homeRouter } = require("./routes/home");
const {todosRouter} = require("./routes/todos");
const { handleError } = require("./utils/errors");

const app = express();

app.use(methodOverride('_method'));
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.static('public'));
app.use(express.json());
app.engine('.hbs', engine({ extname: '.hbs'}));
app.set('view engine', '.hbs');


app.use('/', homeRouter);
app.use('/todos', todosRouter);

app.use(handleError);

app.listen(3000, 'localhost', () => {
        console.log('Listening on http://localhost:3000');
    }
);


