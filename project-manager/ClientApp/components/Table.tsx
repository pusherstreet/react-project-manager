import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as TableStore from '../store/Table';
import {ProjectState, actionCreators} from '../store/Project';

type TableProps = ApplicationState & TableStore.TableState & ProjectState & RouteComponentProps<{}> & typeof TableStore.actionCreators 

class Table extends React.Component<TableProps, {}>{
    componentDidMount(){
        this.props.loadTableTasks();
    }
    render(){
        return <div>
            <h1>Table</h1>
            <table className="table table-bordered tasksList">
            <thead style={{backgroundColor: "#e3e3e3"}}>
                <tr>
                    <th>Title</th>
                    <th>Start</th>
                    <th>Duration</th>
                    <th>End</th>
                    <th>Status</th>
                    <th>Owner</th>
                </tr>     
            </thead>
            <tbody>
            {
                this.props.project.tasks.map(t => {
                                return <tr onClick={() => {this.props.goToTask(t.taskID)}} key={t.taskID}> 
                                    <td>{t.title}</td>
                                    <td>{new Date(t.start).toDateString()}</td>
                                    <td>1</td>
                                    <td>{new Date(t.end).toDateString()}</td>
                                    <td>{t.status.name}</td>
                                    <td>user</td>
                                </tr>
                            })
                        }                
            </tbody>
            </table>
        </div>
    }
}
export default connect(
    (state: ApplicationState) => state,
    {
        loadTableTasks: actionCreators.loadTasks,
        goToTask: TableStore.actionCreators.goToTask
    }
)(Table) as typeof Table;