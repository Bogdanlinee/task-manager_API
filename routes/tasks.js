const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  createOneTask,
  getOneTask,
  changeOneTask,
  deleteOneTask
} = require('../controllers/tasks.js');

router.route('/')
  .get(getAllTasks)
  .post(createOneTask);

router.route('/:id')
  .get(getOneTask)
  .patch(changeOneTask)
  .delete(deleteOneTask);

module.exports = router;