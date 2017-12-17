import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as TableStore from '../store/Table';

type TableProps = TableStore.TableState & RouteComponentProps<{}> & typeof TableStore.actionCreators 

class Table extends React.Component<TableProps, {}>{
    componentWillMount(){
        this.props.loadTableTasks();
    }
    render(){
        return <div>
            <h1>Table</h1>
            <table className="table table-bordered">
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
                this.props.tableTasks.map(t => {
                                return <tr key={t.taskID}> 
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
    (state: ApplicationState) => state.table,
    TableStore.actionCreators
)(Table) as typeof Table;