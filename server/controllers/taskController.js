const { Task, User } = require('../models');

class TaskController {
    static addTask (req, res, next) {
        let newTask = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            priority: req.body.priority,
            UserId: req.currentUser.id
        }

        Task.create(newTask)
        .then(data => {
            res.status(201).json(data);
        })
        .catch(err => {
            next(err);
        })
    }

    static fetchTasks (req, res, next) {
        Task.findAll({
            include: User
        })
        .then(data => {
            let newData = [];

            data.forEach(user => {
                newData.push({
                    id: user.id,
                    title: user.title,
                    description: user.description,
                    category: user.category,
                    priority: user.priority,
                    UserId: user.UserId,
                    User: {
                        id: user.User.id,
                        full_name: user.User.full_name,
                        email: user.User.email
                    }
                })
            });

            res.status(200).json(newData);
        })
        .catch(err => {
            next(err);
        })
    }

    static getSpesificTask (req, res, next) {
        let id = +req.params.id

        Task.findByPk(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            next(err);
        })
    }

    static editTask (req, res, next) {
        let id = +req.params.id;
        let updatedTask = {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            priority: req.body.priority
        };

        Task.update(updatedTask, {
            where: {
                id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1]);
        })
        .catch(err => {
            next(err);
        })
    }

    static changeCategory (req, res, next) {
        let id = +req.params.id;
        let newCategory = {
            category: req.body.category
        }

        Task.update(newCategory, {
            where: {
                id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json(data[1]);
        })
        .catch(err => {
            next(err)
        })
    }

    static deleteTask (req, res, next) {
        let id = +req.params.id;

        Task.destroy({
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json({ message: 'Success. Task has been deleted.' });
        })
        .catch(err => {
            next(err);
        })
    }
}

module.exports = TaskController;