import { connect } from "react-redux";

import ProjectsTable from "./projectsTable";

import ProjTemplate from "./common/projectsTmt";

class Projects extends ProjTemplate {
  renderProjectsTable(data, sortColumn) {
    return (
      <ProjectsTable
        projects={data}
        sortColumn={sortColumn}
        onSort={this.handleSort}
        onDelete={this.handleDelete}
      />
    );
  }

  render() {
    return (
      <div>
        {this.renderLoader()}
        {this.renderPage()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  projects: state.entities.projects,
  types: state.entities.types,
  isLoading: state.ui.isLoading,
  congrats: state.ui.congrats,
});

export default connect(mapStateToProps)(Projects);
