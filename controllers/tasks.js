const Tasks = require('../models/task.js');
const asyncWrapper = require('../middleware/async-wrapper.js');
const { createNewCustomError } = require('../Errors/customError.js');

const getAllTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Tasks.find({});
  res.status(200).json({ tasks: tasks });
});

const createOneTask = asyncWrapper(async (req, res, next) => {
  const task = await Tasks.create(req.body);
  res.status(201).json(task);
});

const getOneTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Tasks.findById(id);

  if (!task) {
    next(createNewCustomError(404, { success: false, msg: 'Sorry, no such task with id: ' + id }));
    return;
  }
  res.status(200).json({ task: task });
});

const changeOneTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const updatedDocument = await Tasks.findOneAndUpdate({ _id: id }, body, {
    returnDocument: 'after', runValidators: true
  });

  if (updatedDocument === null) {
    next(createNewCustomError(404, { success: false, msg: 'Sorry, no such task with id: ' + id }));
    return;
  }
  res.status(200).json({ success: true, task: updatedDocument });
});

const deleteOneTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const deletedElement = await Tasks.findOneAndDelete({ _id: id });

  if (!deletedElement) {
    next(createNewCustomError(404, { success: false, msg: 'Sorry, no such task with id: ' + id }));
    return;
  }
  res.status(200).json({ success: true, msg: 'The task with id: ' + id + ' was deleted' });
});

module.exports = { getAllTasks, createOneTask, getOneTask, changeOneTask, deleteOneTask };