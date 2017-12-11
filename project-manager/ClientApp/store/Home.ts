import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {Task} from '../models';

export interface HomeState {
    tasks: Task[];
    selectedTask: any | null;
}


// Actions
interface ReceiveData {
    type: "RECEIVE_DATA",
    tasks: Task[] 
}

interface SelectTask{
    type: "SELECT_TASK",
    task: Task | null
}
interface CloseTask{
    type: "CLOSE_TASK"
}
interface AddTask{
    type: "ADD_TASK"
}

// functions
const loadData = (): AppThunkAction<ReceiveData> => (dispatch: any, getState: Function) => {  
    let fetchTask = callApi('api/Tasks')
        .then(response => {
            return response.json()
        })
        .then(data => {
            dispatch({ type: 'RECEIVE_DATA', tasks: data });
        });
}

// Action creators
export const actionCreators = {
    loadData: loadData,
    selectTask: (id: number): AppThunkAction<SelectTask> => (dispatch: any, getState: Function) => {
        callApi(`api/Tasks/${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: 'SELECT_TASK', task: data});
        })
    },
    closeTask: (): AppThunkAction<SelectTask> => (dispatch: any, getState: Function) => {
        dispatch({type: "CLOSE_TASK"})
    },
    updateTask: (task: Task): AppThunkAction<SelectTask> => (dispatch: any, getState: Function) => {
        let payload = task;
        let requestData = {
            method: 'PUT',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        callApi(`api/Tasks/${task.taskID}`, requestData)
        .then(response => {
            if(response.ok){
                dispatch({type: 'CLOSE_TASK'});
                dispatch(loadData());
            }else{
                console.log(response.statusText)
            }
        })
        
    },
    addTask: (task: Task): AppThunkAction<SelectTask> => (dispatch: any, getState: Function) => {
        let payload = task;
        let requestData = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        callApi('api/Tasks', requestData)
        .then(response => {
            if(response.ok){
                dispatch(loadData());
            }else{
                console.log(response.statusText);
            }
        })
    }
}

type KnownAction = ReceiveData & SelectTask;

export const reducer: Reducer<HomeState> = (state: HomeState = {tasks: [], selectedTask: null} , incomAction: Action) => {
    const action = incomAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_DATA':
            return {...state, tasks: action.tasks } ;
        case 'SELECT_TASK':
            return {...state, selectedTask: action.task};
        case 'CLOSE_TASK':
            return {...state, selectedTask: null};
        default:
            return state;
    }
}