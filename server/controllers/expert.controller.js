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
    if(err){
      res.status(500).send(err);
    }
    res.json({ experts });
  });
}

export function getExpertInProject(req, res) {
  console.log('controller', req.params)
  if(req.params){
    Expert.find({ _id: {$in: req.params.idArray }}).exec((err, experts) => {
      if(err){
        res.status(500).send(err);
      }
      res.json({ experts });
    });
  }
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
    if (err) {
      res.status(500).json({
        message: err
      });
    }
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
    if (err) {
      res.status(500).send(err);
    }
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
    _id: req.body.experId
  }, {
    $addToSet: {
      $projects: {
        _id: req.body.projectId,
        status: 'pending'
      }
    }
  }, (err) => {
    if(err) {
      res.status(500).json({
        message: err
      });
    }
  })
  .then(() => {
    Project.update({
      _id: req.body.projectId
    }, {
      $addToSet: { experts: req.body.expertId }
    }, (projectErr, project) => {
      if(projectErr) {
        res.status(500).json({
          message: projectErr
        });
      }
      if(res)
        res.json({ project });
    });
  });
}

export function changeExpertStatus(req, res){
  if(!req.body.data.expert || !req.body.data.project || !req.body.data.user.email || !req.body.data.newStatus) {
    return res.status(403).json({
      message: 'Data not entered'
    });
  }
    
  Expert.update({ 
    _id: req.body.expert._id,
    'projects._id': req.body.project._id
  }, {
    $set: { "projects.$.status": req.body.expert.status }
  }).exec((err, expert) => {
    if(err){
      res.status(500).json({
        message: err
      });
    }
  }).then(expert => {
    History.insert({
      projectrID: req.body.expert.title,
      expertId: req.body.expert.name,
      userId: req.body.user.email,
      result: req.body.newStatus
    }).exec((err, history) => {
      if(err){
        res.status(500).json({
          message: err
        });
      }
    });
    res.json({ expert });
  });
}