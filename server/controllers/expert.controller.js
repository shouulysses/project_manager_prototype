import moment from 'moment';
import Project from '../models/project';
import Expert from '../models/expert';
import History from '../models/history';

/**
 * Get all experts
 * @param req
 * @param res
 * @returns void; res.json({ experts })
 **/

export function getExperts(req, res) {
  Expert.find().sort('name').exec((err, experts) => {
    if (err)
      res.status(500).json({ message: err });
    res.json({ experts });
  });
}

/**
 * Save a expert
 * @param req
 * @param res
 * @returns void; res.json({ expert })
 */
export function addExpert(req, res) {
  if (!req.body.expert.name || !req.body.expert.description) {
    res.status(403).json({
      message: 'Data not entered'
    });
  }
  const newExpert = new Expert(req.body.expert);
  newExpert.dateAdded = moment();
  newExpert.save((err, saved) => {
    if (err)
      res.status(500).json({ message: err });
    res.json({ expert: saved });
  });
}

/**
 * Delete a expert
 * @param req
 * @param res
 * @returns void
 */

export function deleteExpert(req, res) {
  Expert.findOne({ _id: req.params.id }).exec((err, expert) => {
    if (err)
      res.status(500).json({ message: err });
    expert.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Adding expert to a project
 * @param req.body: { projectId, expertId }
 * @param res
 * @returns void; res.json({ project })
 */

export function addExpertToProject(req, res) {
  if (!req.body.projectId || !req.body.expertId) {
    res.status(403).json({
      message: 'Data not entered'
    });
  }

  Expert.update({
    _id: req.body.expertId
  }, {
    $addToSet: {
      projects: {
        _id: req.body.projectId,
        status: 'pending'
      }
    }
  })
  .then(() => {
    Project.update({
      _id: req.body.projectId
    }, {
      $addToSet: { experts: req.body.expertId }
    }, (projectErr, project) => {
      if (projectErr)
        res.status(500).json({ message: projectErr });
      if (res)
        res.json({ project });
    });
  });
}

/**
 * Change a expert's status
 * @param req.body: { expertId, projectId, user, status }
 * @param res
 * @returns void; res.json({ expert })
 */

export function changeExpertStatus(req, res) {
  if (!req.body.expertId || !req.body.projectId || !req.body.user || !req.body.status) {
    res.status(403).json({
      message: 'Data not entered'
    });
  }

  Expert.findOneAndUpdate({
    _id: req.body.expertId,
    'projects._id': req.body.projectId
  }, {
    $set: { 'projects.$.status': req.body.status }
  }, {
    new: true
  })
  .then((expert) => {
    const history = new History({
      expertId: req.body.expertId,
      projectId: req.body.projectId,
      userId: req.body.user,
      result: req.body.status,
      dateAdded: moment()
    });
    history.save((err) => {
      if (err)
        res.status(500).json({ message: err });
      res.json({ expert });
    });
  });
}
