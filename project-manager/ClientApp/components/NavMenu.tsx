import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap/lib/InputGroup';
import '../css/site.css';


export default class NavMenu extends React.Component<any, {}> {
    componentWillMount(){
        this.props.loadProjects();
    }
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={'/'}>Project manager</Link>
                    
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <div className="navbar-title">Projects</div>
                            {
                                this.props.projects.map((el: any, key:number) => {
                                    return <div key={key} onClick={() => {this.props.setCurrentProject(el)}} className={"project-link " + (this.props.currentProject && this.props.currentProject.projectID == el.projectID ? "active-project": "")}>
                                        <span className='glyphicon glyphicon-star'></span> {el.title}
                                    </div>
                                })
                            }
                        </li>
                        <li>
                            <div className="navbar-title">Tasks</div>
                            <NavLink exact to={ '/' } activeClassName='active'>
                                <span className='glyphicon glyphicon-calendar'></span> Calendar
                            </NavLink>
                            <NavLink to={ '/board' } activeClassName='active'>
                                <span className='glyphicon glyphicon-list-alt'></span> Board
                            </NavLink>
                            <NavLink to={ '/gantt' } activeClassName='active'>
                                <span className='glyphicon glyphicon-stats'></span> Timeline
                            </NavLink>
                            <NavLink to={ '/table' } activeClassName='active'>
                                <span className='glyphicon glyphicon-tasks'></span> List
                            </NavLink>
                            
                        </li>
                        <li>
                            <div className="navbar-title">Data</div>
                            <NavLink to={ '/import' } activeClassName='active'>
                                <span className='glyphicon glyphicon-import'></span> Import
                            </NavLink>
                            <NavLink to={ '/export' } activeClassName='active'>
                                <span className='glyphicon glyphicon-export'></span> Export
                            </NavLink>
                        </li>
                        <li>
                            <div className="navbar-title">Settings</div>
                            <NavLink to={ '/configuration' } activeClassName='active'>
                                <span className='glyphicon glyphicon-cog'></span> Configuration
                            </NavLink>
                        </li>
                        <li>
                            {
                                this.props.isAuth && <input style={{color: 'white'}} className="btn btn-danger" type="button" onClick={() => this.props.logOff()} value="Log Off" />
                            }
                            
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
