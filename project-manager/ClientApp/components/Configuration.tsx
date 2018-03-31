import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import Switch from 'react-toggle-switch';
import '../css/configuration.css';
import "react-toggle-switch/dist/css/switch.min.css";

type Props = ApplicationState &  RouteComponentProps<{}>

class Configuration extends React.Component<Props, {switched: boolean}>{
    constructor(props) {
        super(props);
        this.state = {
          switched: false
        };
      }
    handleChange = (event: any) => {
        alert(event.target.value);
    }
    toggleSwitch = () => {
        this.setState(prevState => {
            return {
              switched: !prevState.switched
            };
          });
    }
    render(){
        return <div>
            <h2>Configuration</h2>
            <div className="configuration-block" >
                <ul className="configuration-list">
                    <li>
                        <span className="configuration-title">
                            Color theme:
                        </span>
                        <div className="configuration-value">
                            <select onChange={this.handleChange} >
                                <option value="Dark">Dark</option>
                                <option value="Light">Light</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <span className="configuration-title">Task notifications:</span>
                        <div className="configuration-value">
                            <Switch onClick={this.toggleSwitch} on={this.state.switched}/>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state,
    {}
)
(Configuration) as typeof Configuration;