import Project from './models/project';
import Expert from './models/expert';
import moment from 'moment';

export default function () {
  
  //Project.remove({}).exec(()=>{});
  //Expert.remove({}).exec(()=>{});

  

  Project.count().exec((err, count) => {
    console.log(count);
    if (count > 0) {
      return;
    }

    const project1 = new Project({ title: 'New Project A', startDate: moment('20170901'), status: 'new', dateAdded: moment() });
    const project2 = new Project({ title: 'New Project B', startDate: moment('20170901'), status: 'new',  dateAdded: moment() });
    const project3 = new Project({ title: 'New Project C', startDate: moment('20170901'), status: 'new',  dateAdded: moment() });
    const project4 = new Project({ title: 'New Project D', startDate: moment('20170901'), status: 'pending', dateAdded: moment()});
    const project5 = new Project({ title: 'New Project E', startDate: moment('20170501'), status: 'expired'});

    Project.create([project1, project2, project3, project4, project5], (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
  
  const project4_id = Project.findOne({ title: 'New Project D' })._id;
  console.log(project4_id);
  
  Expert.count().exec((err, count) => {
    console.log(count);
    if (count > 0) {
      return;
    }
    
    const expert1 = new Expert({  name: 'John', description: 'John is strong', projects: [{'_id': project4_id, status: 'pending'}], dateAdded: moment() });
    const expert2 = new Expert({  name: 'Tom', description: 'Tom is tall', projects: [{'_id': project4_id, status: 'pending'}], dateAdded: moment() });
    
    Expert.create([expert1, expert2], (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
  
  const expert1_id = Project.findOne({ name: 'John' })._id;
  const expert2_id = Project.findOne({ name: 'Tom' })._id;
  
  Project.update({
    title: 'New Project D'
  }, {
    $set:{
      experts: [expert1_id, expert2_id]
    }
  });
  
  console.log('done');
}