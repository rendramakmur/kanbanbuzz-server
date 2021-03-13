if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const router = require('./routes');
const app = express();
const port = process.env.PORT || 3000
const cors = require('cors');
const errHandler = require('./middlewares/errHandler');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
app.use(errHandler);

app.listen(port, () => {
  console.log(`KanbanBuzz app listening at http://localhost:${port}`);
});