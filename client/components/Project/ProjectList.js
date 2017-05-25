import React, { PropTypes } from 'react';

// Import Components
import ProjectListItem from './ProjectListItem';

function ProjectList(props) {
  return (
    <div className="listView">
      {
        props.projects.map(project => (
          <ProjectListItem
            project={project}
            key={project.cuid}
            onDelete={() => props.handleDeleteProject(project.cuid)}
          />
        ))
      }
    </div>
  );
}

ProjectList.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteProject: PropTypes.func.isRequired,
};

export default ProjectList;
