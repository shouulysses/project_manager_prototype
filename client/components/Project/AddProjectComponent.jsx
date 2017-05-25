import React, { Component, PropTypes } from 'react';
import { Form, Button } from 'semantic-ui-react';
import moment from 'moment';
import { DatePicker, DatePickerInput } from 'rc-datepicker';

export class ProjectCreateWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
      startDate: moment()
    };
  }
  
  addProject = (e) => {
    e.preventDefault();
    if (this.title.value && this.state.startDate) {
      this.props.addProject(this.title.value, this.state.startDate);
      this.title.value = '';
    }
  };
  
  dateChange = (date) => {
    this.setState({ startDate: date });
  }

  render() {
    return (
      <Form onSubmit={this.addProject}>
        <Form.Field>
          <label htmlFor="title" className="label-field"><span className="label-field-name">Title</span></label>
          <input ref={title => (this.title = title)} name="title" type="text" required />
        </Form.Field>
        <label htmlFor="startDate" className="label-field"><span className="label-field-name">Start Date</span></label>
        <DatePickerInput
          showOnInputClick
          closeOnClickOutside
          displayFormat="DD/MM/YYYY"
          onChange={this.dateChange}
          value={ this.state.startDate }
        />
        <div className="btn-group mt2">
         <Button type="submit">Submit</Button>
        </div>
      </Form>
    );
  }
}

ProjectCreateWidget.propTypes = {
  addProject: PropTypes.func.isRequired,
};

export default ProjectCreateWidget;
