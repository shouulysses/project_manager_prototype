import moment from 'moment';
import Project from './models/project';
import Expert from './models/expert';
import History from './models/history';
import * as expertController from './controllers/expert.controller';

export default function () {
  Project.count().exec((err, count) => {
    if (count > 1000) {
      console.log('dummy is not inputted');
      return;
    }
    Project.remove({})
    .then(() => {
      Expert.remove({})
      .then(() => {
        History.remove({})
        .then(() => {
          const project1 = new Project({ title: 'New Project A', startDate: moment('20170901'), status: 'new', dateAdded: moment() });
          const project2 = new Project({ title: 'New Project B', startDate: moment('20170901'), status: 'new', dateAdded: moment() });
          const project3 = new Project({ title: 'New Project C', startDate: moment('20170901'), status: 'new', dateAdded: moment() });
          const project4 = new Project({ title: 'New Project D', startDate: moment('20170901'), status: 'pending', dateAdded: moment() });
          const project5 = new Project({ title: 'New Project E', startDate: moment('20170501'), status: 'expired' });

          Project.create([project1, project2, project3, project4, project5], (error) => {
            if (error)
              console.log(error);
          })
          .then((projects) => {
            const expert1 = new Expert({ name: 'John', description: 'John is strong', dateAdded: moment() });
            const expert2 = new Expert({ name: 'Tom', description: 'Tom is tall', dateAdded: moment() });
            const expert3 = new Expert({ name: 'Peter', description: 'Peter is fast', dateAdded: moment() });

            Expert.create([expert1, expert2, expert3], (error) => {
              if (error)
                console.log(error);
            })
            .then((expert) => {
              expertController.addExpertToProject({ body: { projectId: projects[3]._id, expertId: expert[0]._id } });
              expertController.addExpertToProject({ body: { projectId: projects[3]._id, expertId: expert[1]._id } });
              expertController.addExpertToProject({ body: { projectId: projects[3]._id, expertId: expert[2]._id } });
              console.log('done inputting dummy');
            });
          });
        });
      });
    });
  });
}
