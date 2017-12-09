import * as React from 'react';
import {Modal, Button, Popover, ModalDialogProps, Dropdown} from 'react-bootstrap';
import {connect} from 'react-redux';
import { ApplicationState } from '../store';
import {actionCreators} from '../store/Home';
import * as DateHelper from '../helpers/dateHelper';
import DateTime from './DateTime';

class TaskModal extends React.Component<any, {task: any}>{
    componentWillReceiveProps(props: any){
      if(props.selectedTask) this.state = {task: props.selectedTask};
    }
    close = () => {
        this.props.closeTask();
    }
    
    changeTask = (e: any) => {
		let name = e.target.name;
		let value = e.target.value;
		console.log(this.state)
		let task = this.state.task;
		task[name] = value;
		this.setState({task: task})
    }
    changeStart = (datetime: string) => {
		let task = this.state.task;
		task.start = datetime;
		this.setState({task: task});
    }
    changeEnd = (datetime : string) => {
		let task = this.state.task;
		task.end = datetime;
		this.setState({task: task});
	}
	
    public render(){
        let task = this.props.selectedTask;
        return <div>
          <Modal show={this.props.selectedTask != null} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>{this.props.selectedTask && this.props.selectedTask.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {this.props.selectedTask ?
                <table className="table table-condensed">
                <tbody>
                  <tr>
                    <td>Title</td>
                    <td><input style={{width: "100%"}} type="text" name="title" onChange={this.changeTask} value={this.props.selectedTask.title}/></td>
                  </tr>
                  <tr>
                  <td>Description</td>
                    <td><textarea style={{width: "100%"}} name="description" onChange={this.changeTask} value={this.props.selectedTask.description} cols={16} rows={3} /></td>
                  </tr>
                <tr>
                  <td>Start</td>
                  <td><DateTime value={task.start} onChange={this.changeStart}  /></td>
                </tr>
                <tr>
                  <td>End</td>
                  <td>
					  <DateTime value={task.end} onChange={this.changeEnd} /> 
                  </td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
					<select name="statusID" value={this.props.selectedTask.statusID} onChange={this.changeTask} style={{width: "100%"}} >
						<option value="1">Done</option>
						<option value="2">New</option>
					</select>
					</td>
                </tr>
                </tbody>
              </table> : <h3>No task selected!</h3>
              }            
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-success" onClick={() => {this.props.updateTask(this.state.task)} }>Save</Button>
            </Modal.Footer>
          </Modal>
        </div>
    }
}

export default connect(
    (state: ApplicationState) => state.home,
    actionCreators
)(TaskModal) as typeof TaskModal
