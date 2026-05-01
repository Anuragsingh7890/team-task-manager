const express = require('express');
const { body } = require('express-validator');
const { getProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, getProjects);
router.get('/:id', auth, getProject);
router.post('/', [auth, body('name', 'Name is required').not().isEmpty()], createProject);
router.put('/:id', [auth, body('name', 'Name is required').optional().not().isEmpty()], updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;