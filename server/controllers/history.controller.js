import * as _ from 'lodash';
import History from '../models/history';
import Project from '../models/project';
import Expert from '../models/expert';

/**
 * Get all histories
 * @param req
 * @param res
 * @returns res.json({ histories, projects, experts })
 **/

export function getHistories(req, res) {
  History.find()
  .skip(req.body.skip || 0)
  .limit(req.body.limit || 20)
  .sort('-dateAdded')
  .then((histories) => {
    Project.find({
      _id: { $in: _.map(histories, history => history.projectId) }
    }, {
      title: 1
    })
    .then((projects) => {
      Expert.find({
        _id: { $in: _.map(histories, history => history.expertId) }
      }, {
        name: 1
      }, (err, experts) => {
        if (err)
          res.status(500).json({ message: err });
        res.json({ histories, projects, experts });
      });
    });
  });
}

