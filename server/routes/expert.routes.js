import { Router } from 'express';
import * as expertController from '../controllers/expert.controller';
const router = new Router();

// Get all experts
router.route('/experts').get(expertController.getExperts);

// Get one expert by cuid
router.route('/expert/project').get(expertController.getExpertInProject);

// Add a new expert
router.route('/addExpert').post(expertController.addExpert);

// Delete a expert
router.route('/deleteExpert/:id').post(expertController.deleteExpert);

// Change expert status
router.route('/expertStatus').post(expertController.changeExpertStatus);

export default router;
