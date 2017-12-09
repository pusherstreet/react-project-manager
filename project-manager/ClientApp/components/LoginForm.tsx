import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import { actionCreators } from '../store/Auth';
import {Modal, Button, Popover, ModalDialogProps} from 'react-bootstrap';


class LoginForm extends React.Component<any, {password: string, email: string}>{
    constructor(){
        super();
        this.state = { password: '', email: ''};
    }

    close = () => {
      this.props.history.push('/');
    }

    passChange = (e: any) => {
        this.setState({password: e.target.value});
    }
    emailChange = (e: any) => {
      this.setState({email: e.target.value});
    }
  
    render() {
  
      return (
        <div>
          <Modal show={!this.props.auth.isAuth} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <table className="table table-condensed">
              <tbody>
                <tr>
                  <td><label>Email</label></td>
                  <td><input ref="email" type="email" onChange={this.emailChange}/></td>
                </tr>
                <tr>
                  <td><label>Password</label></td>
                  <td><input ref="password" type="password" onChange={this.passChange} /></td>
                </tr>
                <tr>
                  <td colSpan={2}>
                  <input className="btn btn-info" onClick={() => {this.props.login(this.state.email, this.state.password)}} type="button" value="Login"/>
                  </td>
                </tr>
                </tbody>
              </table>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
  };

  export default connect(
    (state: ApplicationState) => state,
    actionCreators
  )(LoginForm) as typeof LoginForm;
