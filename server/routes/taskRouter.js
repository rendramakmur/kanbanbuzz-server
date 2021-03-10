const TaskController = require('../controllers/taskController');
const router = require('express').Router();

router.post('/', TaskController.addTask);
router.get('/', TaskController.fetchTasks);
router.get('/:id', TaskController.getSpesificTask);
router.put('/:id', TaskController.editTask);
router.patch('/:id', TaskController.changeCategory);
router.delete('/:id', TaskController.deleteTask);


module.exports = router;