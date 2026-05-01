const express = require('express');
const { body } = require('express-validator');
const { getTasks, getTask, createTask, updateTask, deleteTask, getDashboardStats } = require('../controllers/taskController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getTasks);
router.get('/:id', auth, getTask);
router.post('/', [auth, body('title', 'Title is required').not().isEmpty(), body('project', 'Project is required').not().isEmpty()], createTask);
router.put('/:id', [auth, body('title', 'Title is required').optional().not().isEmpty()], updateTask);
router.delete('/:id', auth, deleteTask);
router.get('/dashboard/stats', auth, getDashboardStats);

module.exports = router;