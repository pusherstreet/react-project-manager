import * as React from 'react';
import * as gantt from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
 
export default class Gantt extends React.Component<any, {}> {
  componentDidMount() {
        console.log('mount')
        gantt.init(this.ganttContainer);
        gantt.attachEvent("onAfterLinkAdd", (id: any, item: any) => {
            this.props.onlinkchange(item);
        });
        gantt.parse(this.props.tasks);
  }

  ganttContainer: any;
  setZoom(value: string){
    switch (value){
      case 'Hours':
        gantt.config.scale_unit = 'day';
        gantt.config.date_scale = '%d %M';
 
        gantt.config.scale_height = 60;
        gantt.config.min_column_width = 30;
        gantt.config.subscales = [
          {unit:'hour', step:1, date:'%H'}
        ];
        break;
      case 'Days':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "week";
        gantt.config.date_scale = "#%W";
        gantt.config.subscales = [
          {unit: "day", step: 1, date: "%d %M"}
        ];
        gantt.config.scale_height = 60;
        break;
      case 'Months':
        gantt.config.min_column_width = 70;
        gantt.config.scale_unit = "month";
        gantt.config.date_scale = "%F";
        gantt.config.scale_height = 60;
        gantt.config.subscales = [
          {unit:"week", step:1, date:"#%W"}
        ];
        break;
      default:
        break;
    }
  }
 
  componentWillReceiveProps(props: any){
    gantt.init(this.ganttContainer);
    gantt.parse(props.tasks);
    this.setZoom(props.zoom);
  }
  componentDidUpdate() {
    gantt.render();
  }

  render() {
    
    return (
        <div
            ref={(input) => { this.ganttContainer = input }}
            style={{width: '100%', height: '100%'}}
        ></div>
    );
  }
}