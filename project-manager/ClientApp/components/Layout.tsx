import * as React from 'react';
import NavMenu from './NavMenu';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as AuthStore from '../store/Auth';
import * as ProjectStore from '../store/Project';
import LoginForm from './LoginForm';

class Layout extends React.Component<any, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu 
                    isAuth={this.props.auth.isAuth} 
                    username={this.props.auth.user.username} 
                    logOff={this.props.logoff}
                    loadProjects={this.props.loadProjects}
                    projects={this.props.project.projectList}
                    currentProject={this.props.project.currentProject}
                    setCurrentProject={this.props.setCurrentProject}
                     />
                </div>
                
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
            <LoginForm />
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => state,
    {
        login: AuthStore.actionCreators.login,
        logoff: AuthStore.actionCreators.logoff,
        loadProjects: ProjectStore.actionCreators.loadProjects,
        setCurrentProject: ProjectStore.actionCreators.setCurrentProject
    }
)(Layout) as typeof Layout;
