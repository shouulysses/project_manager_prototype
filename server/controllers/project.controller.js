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

/**
 * Get a single project
 * @param req
 * @param res
 * @returns void
 */
export function getProject(req, res) {
  if(req.params && req.params.id){
    Project.findOne({ _id: req.params.id }).exec((err, project) => {
      if (err) {
        res.status(500).send(err);
      }else{
        res.json({ project });
      }
    });
  }else{
    res.json({ });
  }
}


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
 * Delete a project
 * @param req
 * @param res
 * @returns void
 */
 
export function deleteProject(req, res) {
  Project.findOne({ _id: req.params.id }).exec((err, project) => {
    if (err) {
      res.status(500).send(err);
    }

    project.remove(() => {
      res.status(200).end();
    });
  });
}
