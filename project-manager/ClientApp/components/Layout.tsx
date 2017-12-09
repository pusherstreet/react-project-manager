import * as React from 'react';
import NavMenu from './NavMenu';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as AuthStore from '../store/Auth';
import LoginForm from './LoginForm';

class Layout extends React.Component<any, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu isAuth={this.props.auth.isAuth} username={this.props.auth.user.username} logOff={this.props.logoff} />
                </div>
                
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
            <LoginForm />
        </div>;
    }
}
export default connect(
    (state: ApplicationState) => state,
    AuthStore.actionCreators
)(Layout) as typeof Layout;
