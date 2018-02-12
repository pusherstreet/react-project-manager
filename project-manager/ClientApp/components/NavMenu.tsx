import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap/lib/InputGroup';


export default class NavMenu extends React.Component<any, {}> {
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
                                <span className='glyphicon glyphicon-tasks'></span> Table
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
