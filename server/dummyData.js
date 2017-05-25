import Project from './models/project';
import moment from 'moment';

export default function () {

  Project.count().exec((err, count) => {
    console.log(count);
    if (count > 0) {
      return;
    }

    const project1 = new Project({ title: 'New Project A', startDate: moment('20170901'), status: 'new', dateAdded: moment() });
    const project2 = new Project({ title: 'New Project B', startDate: moment('20170901'), status: 'new',  dateAdded: moment() });
    const project3 = new Project({ title: 'New Project C', startDate: moment('20170901'), status: 'new',  dateAdded: moment() });
    const project4 = new Project({ title: 'New Project D', startDate: moment('20170901'), status: 'pending', dateAdded: moment(), experts:['expert1', 'expert2'] });
    const project5 = new Project({ title: 'New Project E', startDate: moment('20170501'), status: 'expired'});

    Project.create([project1, project2, project3, project4, project5], (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
}