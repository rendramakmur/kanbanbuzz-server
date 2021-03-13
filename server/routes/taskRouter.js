const TaskController = require('../controllers/taskController');
const { authorization } = require('../middlewares/auth');
const router = require('express').Router();

router.post('/', TaskController.addTask);
router.get('/', TaskController.fetchTasks);
router.get('/:id', authorization, TaskController.getSpesificTask);
router.put('/:id', authorization, TaskController.editTask);
router.patch('/:id', authorization, TaskController.changeCategory);
router.delete('/:id', authorization, TaskController.deleteTask);


module.exports = router;