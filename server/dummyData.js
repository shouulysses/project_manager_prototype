import Project from './models/project';
import Expert from './models/expert';
import moment from 'moment';
import * as expertController from './controllers/expert.controller';

export default function () {
  let projectD_id = '';
  let expert1_id = '';
  let expert2_id = '';
  
  Project.count().exec((err, count) => {
    if(count > 0){
      console.log('dummy is not inputted');
      return;
    }
    Project.remove( {})
    .then(() => {
      Expert.remove({})
      .then(() => {
        const project1 = new Project({ title: 'New Project A', startDate: moment('20170901'), status: 'new', dateAdded: moment() });
        const project2 = new Project({ title: 'New Project B', startDate: moment('20170901'), status: 'new',  dateAdded: moment() });
        const project3 = new Project({ title: 'New Project C', startDate: moment('20170901'), status: 'new',  dateAdded: moment() });
        const project4 = new Project({ title: 'New Project D', startDate: moment('20170901'), status: 'pending', dateAdded: moment()});
        const project5 = new Project({ title: 'New Project E', startDate: moment('20170501'), status: 'expired'});
    
        Project.create([project1, project2, project3, project4, project5], (error, project) => {
          if (error) {
            console.log(error);
          }
          projectD_id = project[3]._id;
        })
        .then(() => {
          const expert1 = new Expert({  name: 'John', description: 'John is strong', dateAdded: moment() });
          const expert2 = new Expert({  name: 'Tom', description: 'Tom is tall', dateAdded: moment() });
              
          Expert.create([expert1, expert2], (error, expert) => {
            if (error) {
              console.log(error);
            }
            expert1_id = expert[0]._id;
            expert2_id = expert[1]._id;
          })
          .then(() => {
            expertController.addExpertToProject({ body: { projectId: projectD_id, expertId: expert1_id } });
            expertController.addExpertToProject({ body: { projectId: projectD_id, expertId: expert2_id } });
            console.log('done inputting dummy')
          });
        });
      });
    });
  });
}