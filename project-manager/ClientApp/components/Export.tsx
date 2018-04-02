import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ExportStore from '../store/Export';

type ExportState = ApplicationState & RouteComponentProps<{}> & typeof ExportStore.actionCreators;

class Export extends React.Component<ExportState,{}>{
    render(){
        return <div>
            <h2>Export</h2>
            <h4>Export project tasks as in excel format.</h4>
            <button onClick={() => {this.props.exportTasks()}} className= "btn btn-info">Export</button>
        </div>
    }
}
export default connect(
    (state: ApplicationState) => state,
    ExportStore.actionCreators
)(Export) as typeof Export;