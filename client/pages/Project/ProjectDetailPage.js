import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Actions
import { fetchProject } from '../../actions/ProjectActions';

// Import Selectors
import { getProject } from '../../reducers/ProjectReducer';

export function ProjectDetailPage(props) {
  return (
    <div>
      <Helmet title={props.project.title} />
      <div className="single-project project-detail">
        <h3 className="project-title">{props.project.title}</h3>
        <p className="author-name"><FormattedMessage id="by" /> {props.project.name}</p>
        <p className="project-desc">{props.project.content}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in sever side.
ProjectDetailPage.need = [params => {
  return fetchProject(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    project: getProject(state, props.params.cuid),
  };
}

ProjectDetailPage.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(ProjectDetailPage);
