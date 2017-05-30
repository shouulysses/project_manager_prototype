import * as _ from 'lodash';
import moment from 'moment';
import Project from '../models/project';
import Expert from '../models/expert';

/**
 * Get all projects
 * @param req
 * @param res
 * @returns void; res.json({ projects })
 */

export function getProjects(req, res) {
  Project.find().sort('-startDate').exec((err, projects) => {
    if (err)
      res.status(500).json({ message: err });
    res.json({ projects });
  });
}

/**
 * Get a single project
 * @param req.params.id
 * @param res
 * @returns void; res.json({ project, experts })
 */

export function getProject(req, res) {
  if (_.get(req, 'params.id')) {
    Project.findOne({
      _id: req.params.id
    }, (err) => {
      if (err)
        res.status(500).json({ message: err });
    })
    .then((project) => {
      Expert.find({
        _id: { $in: project.experts }
      }, (expertErr, experts) => {
        if (expertErr)
          res.status(500).json({ message: expertErr });
        res.json({ project, experts });
      });
    });
  }
}

/**
 * Save a project
 * @param req.body: { project: { title, startDate } }
 * @param res
 * @returns void; res.json({ project })
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
    if (err)
      res.status(500).json({ message: err });
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
