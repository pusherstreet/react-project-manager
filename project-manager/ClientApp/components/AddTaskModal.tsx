import * as React from 'React';
import {Modal, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';
import { ApplicationState } from '../store';
import {actionCreators} from '../store/Project';
import * as DateHelper from '../helpers/dateHelper';
import DateTime from './DateTime';

export default class AddTaskModal extends React.Component<any, {isShow: boolean, task: any }>{
    constructor(){
        super();
        this.state = {isShow: false, task: {start: new Date(), end: new Date()}};
    }
    close = () => {
        this.setState({isShow: false})
    }
    changeTask = (e: any) => {
        let name = e.target.name;
		let value = e.target.value;
		console.log(name);
		let task = this.state.task;
		task[name] = value;
		this.setState({task: task})
    }

    addTask = () =>{
        this.setState({isShow: false});
        console.log(this.props);
        this.props.onAdd(this.state.task);
    }
    render(){
        return  <div>
        <Button className="btn btn-success" onClick={() => this.setState({isShow: true})}><span className="glyphicon glyphicon-plus"></span> Create Task</Button>
        <Modal show={this.state.isShow} onHide={this.close}>
            <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup controlId="title">
                    <ControlLabel>Title</ControlLabel>
                    <FormControl name="title" value={this.state.task.title} onChange={this.changeTask} type="text" placeholder="Title"></FormControl>
                </FormGroup>
                <FormGroup controlId="Description">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl name="description" value={this.state.task.description} onChange={this.changeTask} type="text" placeholder="Description"></FormControl>
                </FormGroup>
                <FormGroup controlId="Start">
                    <ControlLabel>Start</ControlLabel>
                    <DateTime name="start" value={this.state.task.start } onChange={this.changeTask} />
                </FormGroup>
                <FormGroup controlId="End">
                    <ControlLabel>End</ControlLabel>
                    <DateTime name="end" value={this.state.task.end } onChange={this.changeTask}/>
                </FormGroup>
                <FormGroup controlId="Start">
                    <ControlLabel>Status</ControlLabel>
                    <FormControl name="statusID" value={this.state.task.statusID || 1} onChange={this.changeTask} componentClass="select" placeholder="select">
                        <option value="1">Done</option>
                        <option value="2">New</option>
                        <option value="3">Canceled</option>
                        <option value="4">Approved</option>
                    </FormControl>
                </FormGroup>

            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-success" onClick={this.addTask} >Create Task</Button>
            </Modal.Footer>
            </Modal>
            </div>
    }
}