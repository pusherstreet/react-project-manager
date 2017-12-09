import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import * as Tasks from './Home';
import { push, replace } from 'react-router-redux';

export interface AuthState {
    user: Identity;
    isAuth: boolean;
}

interface Identity {
    access_token: string;
    username: string;
}

const notAuthState = {
    isAuth: false, user: { access_token: "", username: "" }};

const initState: AuthState = localStorage.getItem("user") == null ? notAuthState : { isAuth: true, user: { access_token: localStorage.getItem("jwt") as string, username: localStorage.getItem("user") as string } }


interface LoginRequest {
    type: "LOGIN",
    user: Identity
}
interface LogOf {
    type: "LOG_OFF"
}

type KnownAction = LoginRequest & LogOf;

export const actionCreators = {
    login: (username: string, password: string): any => (dispatch: any, getState: Function) => {
        const payload = { username: username, password: password };

        fetch('api/Account/token', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
            .then(data => {
                localStorage.setItem('jwt', data.access_token);
                localStorage.setItem('user', data.username);
                dispatch({ type: 'LOGIN', user: data, isAuth: true });

            }).then(() => {
                let p = push('/');
                console.log(p);
                dispatch(p);              
            });
    },
    logoff: (): any => (dispatch: any, getSate: Function) => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        dispatch({ type: 'LOG_OFF' });
    }
}

export const reducer: Reducer<AuthState> = (state: AuthState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOGIN':
            return { user: action.user, isAuth: true }
        case 'LOG_OFF':
            return notAuthState;
        default:
            return state || initState;
    }
}