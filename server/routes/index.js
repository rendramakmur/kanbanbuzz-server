const router = require('express').Router();
const user = require('./userRouter');
const task = require('./taskRouter');
const { authentication } = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.send('Welcome to KanbanBuzz REST API!')
})

router.use(user);

router.use(authentication);

router.use('/tasks', task);

module.exports = router;