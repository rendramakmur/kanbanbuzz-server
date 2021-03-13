if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const express = require('express');
const router = require('./routes');
const app = express();
const PORT = process.env.port || 3000
const cors = require('cors');
const errHandler = require('./middlewares/errHandler');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(router);
app.use(errHandler);

app.listen(PORT, () => {
  console.log(`KanbanBuzz app listening at http://localhost:${PORT}`);
});