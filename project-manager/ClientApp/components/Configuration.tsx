import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Switch from 'react-toggle-switch';
import '../css/configuration.css';
import "react-toggle-switch/dist/css/switch.min.css";
import * as ConfigurationStore from '../store/Configuration';
import { Button } from 'react-bootstrap/lib/InputGroup';

type Props = ConfigurationStore.configurationState & typeof ConfigurationStore.actionCreators &  RouteComponentProps<{}>

class Configuration extends React.Component<Props, {switched: boolean}>{
    constructor(props) {
        super(props);
        this.state = {
          switched: false
        };
      }
    handleChange = (event: any) => {
        this.props.changeTheme(event.target.value);
    }
    toggleSwitch = () => {
        this.props.switchNotifications();
    }
    componentDidMount(){
        this.props.load();
    }
    save = () => {
        this.props.saveConfiguration(this.props.configuration);
    }
    componentWillUnmount(){
        if(this.props.changed){
            confirm("Save changes?") ? this.save() : this.props.load();
        }
    }
    render(){
        return <div>
            <h2>Configuration</h2>
            {this.props.configurationLoaded &&
                <div className="configuration-block" >
                    <ul className="configuration-list">
                        <li>
                            <span className="configuration-title">
                                Color theme:
                            </span>
                            <div className="configuration-value">
                                <select value={this.props.configuration.Theme} onChange={this.handleChange} >
                                    <option value="Dark">Dark</option>
                                    <option value="Light">Light</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <span className="configuration-title">Task notifications:</span>
                            <div className="configuration-value">
                                <Switch onClick={this.toggleSwitch} on={this.props.configuration.Notifications}/>
                            </div>    
                        </li>                                                                  
                    </ul>
                    <div><button style={{float: 'right'}} className="btn btn-success" onClick={() => {confirm("Are you sure?") && this.save()}}>Save changes</button></div>
                </div>
            }
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.configuration,
    ConfigurationStore.actionCreators
)
(Configuration) as typeof Configuration;