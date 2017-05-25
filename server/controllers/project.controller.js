import Project from '../models/project';
import moment from 'moment';

/**
 * Get all projects
 * @param req
 * @param res
 * @returns void
 */
export function getProjects(req, res) {
  Project.find().sort('-startDate').exec((err, projects) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ projects });
  });
}

/*
export function getNewProjects(req, res) {
  Project.find({status: 'new'}).sort('-startDate').exec((err, projects) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ projects });
  });
}

export function getPendingProjects(req, res){
  Project.find({startDate: {$lte: Date.now()}}).sort('-startDate').exec((err, projects) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ projects });
  });
}

export function getExpiredProjects(req, res){
  Project.find({startDate: {$gte: Date.now()}}).sort('-startDate').exec((err, projects) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ projects });
  });
}
*/

/**
 * Save a project
 * @param req
 * @param res
 * @returns void
 */
export function addProject(req, res) {
  if (!req.body.project.title || !req.body.project.startDate) {
    res.status(403).json({
      message: 'Data not entered'
    });
  }

  const newProject = new Project(req.body.project);
  newProject.status = moment(req.body.project.startDate) >= moment() ? 'new' : 'expired';
  newProject.dateAdded = moment();
  newProject.save((err, saved) => {
    if (err) {
      res.status(500).json({
        message: err
      });
    }
    res.json({ project: saved });
  });
}

/**
 * Get a single project
 * @param req
 * @param res
 * @returns void
 */
export function getProject(req, res) {
  Project.findOne({ _id: req.params.id }).exec((err, project) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ project });
  });
}

/**
 * Delete a project
 * @param req
 * @param res
 * @returns void
 */
export function deleteProject(req, res) {
  console.log(req.params.id)
  Project.findOne({ _id: req.params.id }).exec((err, project) => {
    if (err) {
      res.status(500).send(err);
    }

    project.remove(() => {
      res.status(200).end();
    });
  });
}
