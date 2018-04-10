import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as ImportStore from '../store/Import';
import {ImportStatus} from '../store/Import';

type ImportProps = RouteComponentProps<{}> & ImportStore.ImportState & typeof ImportStore.actionCreators;

class Import extends React.Component<ImportProps, {}>{
    componentWillMount(){
        this.props.init();
    }
    handeChange = (e: any) => {
        const target = e.target as HTMLInputElement;
        const file = target.files[0];
        this.props.importExcel(file);
    }
    render(){
        return <div>
            <h2>Import</h2>
                <button className= "btn btn-info" onClick={() => {this.props.loadGoogleTasks()}}>Google Calendar</button>
                <span style={{marginLeft: '15px'}} className="btn btn-success btn-file">
                    Excel <input onChange={this.handeChange} type="file" />
                </span>
                {
                    this.props.events.length ? (<div>
                        <h3>Loaded google events</h3>
                        {this.props.events.map(event => {
                            return <p>{event.Summary}</p>
                        })}
                    </div>) : <div></div>
                }
                {
                    this.props.importResult &&(
                        <div>
                            <h3>Import result</h3>
                            <p>Added: {this.props.importResult.added}</p>
                            <p>Updated: {this.props.importResult.updated}</p>
                        </div>
                    )
                }            
        </div>
    }
}
export default connect(
    (state:ApplicationState) => state.import,
    ImportStore.actionCreators
)(Import) as typeof Import;