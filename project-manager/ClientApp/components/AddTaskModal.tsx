import * as React from 'React';
import {Modal, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import {connect} from 'react-redux';
import { ApplicationState } from '../store';
import {actionCreators} from '../store/Home';
import * as DateHelper from '../helpers/dateHelper';
import DateTime from './DateTime';

export default class AddTaskModal extends React.Component<any, {isShow: boolean }>{
    constructor(){
        super();
        this.state = {isShow: true};
    }
    close = () => {
        this.setState({isShow: false})
    }
    render(){
        return  <div>
        <Button className="btn btn-success" onClick={() => this.setState({isShow: true})}>New Task</Button>
        <Modal show={this.state.isShow} onHide={this.close}>
            <Modal.Header closeButton>
            <Modal.Title>Create New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormGroup controlId="title">
                    <ControlLabel>Title</ControlLabel>
                    <FormControl type="text" placeholder="Title"></FormControl>
                </FormGroup>
                <FormGroup controlId="Description">
                    <ControlLabel>Description</ControlLabel>
                    <FormControl type="text" placeholder="Description"></FormControl>
                </FormGroup>
                <FormGroup controlId="Start">
                    <ControlLabel>Start</ControlLabel>
                    <DateTime />
                </FormGroup>
                <FormGroup controlId="End">
                    <ControlLabel>End</ControlLabel>
                    <DateTime />
                </FormGroup>
                <FormGroup controlId="Start">
                    <ControlLabel>Status</ControlLabel>
                    <FormControl componentClass="select" placeholder="select">
                        <option value="1">Done</option>
                        <option value="2">New</option>
                    </FormControl>
                </FormGroup>

            </Modal.Body>
            <Modal.Footer>
              <Button className="btn btn-success" >Create Task</Button>
            </Modal.Footer>
            </Modal>
            </div>
    }
}