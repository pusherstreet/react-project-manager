import * as React from 'react';
import Gantt from './Gantt';
import '../css/App.css';
import Toolbar from './Toolbar';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import {AuthState} from '../store/Auth';
import * as GanttStore from '../store/Gantt';
 
var data = {
  data: [
    {id: 1, text: 'Task #1', start_date: '15-04-2017', duration: 3, progress: 0.6},
    {id: 2, text: 'Task #2', start_date: '18-04-2017', duration: 3, progress: 0.4}
  ],
  links: [
    {id: 1, source: 1, target: 2, type: '0'}
  ]
};

type GanttProps = GanttStore.GanttState & typeof GanttStore.ActionCreators & RouteComponentProps<{}>

class GanttComponent extends React.Component<GanttProps, {currentZoom: string}> {
  constructor(){
    super();
    this.state = {currentZoom: 'Days'}
  }
  public componentWillMount() {
    this.props.loadTasks() ;
  }
  handleZoomChange = (zoom: any) => {
    this.setState({
      currentZoom: zoom
    });
  }
  render() {
    return (
      <div>
        <h1>Timeline</h1>
        <Toolbar
        zoom={this.state.currentZoom}
        onZoomChange={this.handleZoomChange}
      />
      <div className="gantt-container">
        <Gantt
          tasks={this.props.tasks}
          zoom={this.state.currentZoom}
          onlinkchange={this.props.addLink.bind(this)}
          ontaskresize={this.props.resizeTask.bind(this)}
          ontaskadd={this.props.addTask.bind(this)}
          ontaskdelete={this.props.deleteTask.bind(this)}
        />
      </div>
      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.gantt,
  GanttStore.ActionCreators
)(GanttComponent) as typeof GanttComponent