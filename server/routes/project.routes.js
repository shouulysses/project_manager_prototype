import { Router } from 'express';
import * as ProjectController from '../controllers/project.controller';

const router = new Router();

// Get all Projects
router.route('/projects').get(ProjectController.getProjects);

// Get one project by cuid
router.route('/project/:id').get(ProjectController.getProject);

// Add a new Project
router.route('/addProject').post(ProjectController.addProject);

// Delete a Project
router.route('/deleteProject/:id').post(ProjectController.deleteProject);

export default router;
