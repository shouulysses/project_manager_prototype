import Project from '../models/project';
import Expert from '../models/expert';
import History from '../models/history';
import moment from 'moment';

/**
 * Get all experts
 * @param req
 * @param res
 * @returns void
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
 * @returns void
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



export function addExpertToProject(req, res) {
  if(!req.body.projectId || !req.body.expertId) {
    return res.status(403).json({
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
  .then((expert) => {
    Project.update({
      _id: req.body.projectId
    }, {
      $addToSet: { experts: req.body.expertId }
    }, (projectErr, project) => {
      if (projectErr)
        res.status(500).json({ message: projectErr });
      if(res)
        res.json({ project });
    });
  });
}

export function changeExpertStatus(req, res){
  console.log('controller', req.body);
  if(!req.body.expertId || !req.body.projectId || !req.body.user || !req.body.status) {
    return res.status(403).json({
      message: 'Data not entered'
    });
  }
    
  Expert.findOneAndUpdate({ 
    _id: req.body.expertId,
    'projects._id': req.body.projectId
  }, {
    $set: { "projects.$.status": req.body.status }
  }, {
    new: true
  })
  .then((expert) => {
    console.log('yo');
    const history = new History({
      expertId: req.body.expertId,
      projectId: req.body.projectId,
      userId: req.body.user,
      result: req.body.status,
      dateAdded: moment()
    });
    history.save((err, history) => {
      if (err)
        res.status(500).json({ message: err })
      console.log('err', err)
      console.log('finish', expert)
      console.log('history', history)
      res.json({ expert });
    });
  });
}