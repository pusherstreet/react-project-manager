import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ImportStore from '../store/Import';

type ImportProps = RouteComponentProps<{}> & ImportStore.ImportState & typeof ImportStore.actionCreators;

class Import extends React.Component<ImportProps, {}>{
    componentWillMount(){
        console.log('mount');
        this.props.init();
    }
    render(){
        return <div>
            <h2>Import</h2>
            <button onClick={() => {this.props.loadGoogleTasks()}}>Google Import</button>
        </div>
    }
}
export default connect(
    (state:ApplicationState) => state.import,
    ImportStore.actionCreators
)(Import) as typeof Import;