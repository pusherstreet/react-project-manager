import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import { Task } from '../models';

export interface TaskState {
    currentTask: Task;
    isChanged: boolean;
    showSaveMessage: boolean;
}

const initialState: TaskState = {
    currentTask: null,
    isChanged: false,
    showSaveMessage: false
}

interface loadTask {
    type: 'LOAD_TASK',
    payload: Task
}
interface changeTask{
    type: 'CHANGE_TASK',
    prop: string,
    value: any
}
interface hideMessage{
    type: "HIDE_MESSAGE",
    msgType: string
}
interface saveTask{
    type: "SAVE_TASK"
}

export const actionCreators = {
    load : (id: number): AppThunkAction<loadTask> => (dispatch:Function, getState: Function) => {
        callApi('api/Tasks/' + id.toString())
        .then(response => response.json())
        .then(data => {
            dispatch({type: "LOAD_TASK", payload: data});
        })
    },
    change: (prop: string, value: any) => (dispatch: Function, getState:Function) => {
        dispatch({type: "CHANGE_TASK", prop: prop, value: value})
    },
    save: (task: Task): AppThunkAction<saveTask> => (dispatch:Function, getState: Function) => {
        const requestData = {
            method: 'PUT',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json;'
            }
        } 
        callApi(`api/Tasks/${task.taskID}`, requestData)
        .then(response => {
            if(response.ok){
                dispatch({type: 'SAVE_TASK'});
                setTimeout(() => {dispatch({type: 'HIDE_MESSAGE', msgType: 'save'})}, 1000)
            }else{
                console.log(response.statusText);
            }
        })
    },
    hideMsg: (type: string) => (dispatch:Function, getState: Function) => {
        dispatch({type: 'HIDE_MESSAGE', msgType: type});
    } 
}

type KnownAction = loadTask & changeTask & saveTask & hideMessage;

export const reducer: Reducer<TaskState> = (state: TaskState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case "LOAD_TASK":
            return {...state, currentTask: action.payload}
        case "CHANGE_TASK":
            let currentTask = {...state.currentTask};
            currentTask[action.prop] = action.value;
            return {...state, currentTask: currentTask, isChanged: true };
        case "SAVE_TASK":
            return {...state, isChanged: false, showSaveMessage: true};
        case "HIDE_MESSAGE":
            return {...state, showSaveMessage: false};
    }
    return state;
}