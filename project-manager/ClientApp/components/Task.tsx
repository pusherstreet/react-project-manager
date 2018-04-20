import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as TableStore from '../store/Table';

type TaskProps = RouteComponentProps<{id:number}> & ApplicationState;

class Task extends React.Component<TaskProps, {}>{
    render(){
        return <div>
            <h2>Task #{this.props.match.params.id}</h2>
        </div>
    }
}

export default connect (
(state: ApplicationState) => state,
{}
)(Task) as typeof Task;