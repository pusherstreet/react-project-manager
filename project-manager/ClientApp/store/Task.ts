import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import { Task, TaskHistory, TaskChange } from '../models';


export interface TaskState {
    currentTask: Task;
    taskChanges: TaskChange[]
    initialTask: Task,
    isChanged: boolean;
    showSaveMessage: boolean;
    historyList: TaskHistory[];
}

const initialState: TaskState = {
    currentTask: null,
    initialTask: null,
    taskChanges: [],
    isChanged: false,
    showSaveMessage: false,
    historyList: []
}

interface loadTask {
    type: 'LOAD_TASK',
    payload: Task
}
interface loadHistory{
    type: 'LOAD_TASK_HISTORY',
    payload: TaskHistory[]
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
interface insertChange{
    type: "INSERT_CHANGE",
    payload: TaskChange
}

interface updateChange{
    type: "UPDATE_CHANGE",
    payload: TaskChange
}
interface removeChange{
    type: "REMOVE_CHANGE",
    payload: string
}
interface addComment{
    type: "ADD_COMMENT",
    payload: TaskHistory
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
        dispatch({type: "CHANGE_TASK", prop: prop, value: value});
    },
    registerChange: (prop: string, type: string, newValue: any = null, oldValue: any = null) => (dispatch: Function, getState: Function) => {
        switch(type){
            case 'insert':{
                const change: TaskChange = {
                    fieldName: prop,
                    oldValue: oldValue,
                    newValue: newValue,
                    created: new Date()
                }
                const action: insertChange = {
                    payload: change,
                    type: 'INSERT_CHANGE'
                } 

                dispatch(action);
            }
            break;
            case 'update':{
                const change: TaskChange = {
                    fieldName: prop,
                    oldValue: oldValue,
                    newValue: newValue,
                    created: new Date()
                }
                const action: updateChange = {
                    payload: change,
                    type: 'UPDATE_CHANGE'
                } 
                
                dispatch(action);
            }
            break;
            case 'remove':{
                const action: removeChange = {
                    type: 'REMOVE_CHANGE',
                    payload: prop
                }
                dispatch(action);
            }
            break;
        }
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
    },
    loadHistory: (id: number): AppThunkAction<loadHistory> => (dispatch: Function, getState: Function) =>{
        callApi(`api/history/${id}`)
        .then(response => response.json())
        .then(history => {
            console.log(history);
            dispatch({type: "LOAD_TASK_HISTORY", payload: history});
        });
    },
    addComment: (text: string, taskID: number, userID: string): AppThunkAction<addComment> => (dispatch: Function, getState: Function) => {
        const payload = {
            message: text,
            taskID: taskID,
            userID: userID,
            created: new Date()
        };
        
        const requestData = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json;'
            }
        };
        callApi('api/history', requestData)
        .then(response => response.json())
        .then(data => {
            const action: addComment = {
                type: "ADD_COMMENT",
                payload: data
            };
            dispatch(action);
        });
    }
}

type KnownAction = loadTask & changeTask & saveTask & hideMessage & loadHistory & insertChange & updateChange & removeChange;

export const reducer: Reducer<TaskState> = (state: TaskState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case "LOAD_TASK":
            return {...state, currentTask: action.payload, initialTask: action.payload, taskChanges: []};
        case "CHANGE_TASK":
            let currentTask = {...state.currentTask};
            currentTask[action.prop] = action.value;
            return {...state, currentTask: currentTask, isChanged: true };
        case "INSERT_CHANGE":{
            let changes = state.taskChanges.map(el => {
                return {...el};
            });
            changes.push(action.payload);
            return {...state, taskChanges: changes};
        }
        case "UPDATE_CHANGE": {
            let changes = state.taskChanges.map(el => {
                return {...el};
            });
            let change: TaskChange = changes[action.payload.fieldName];
            if(change){
                change.newValue = action.payload.newValue;
                change.created = action.payload.created;
            }
            return {...state, taskChanges: changes};
        }
        case "REMOVE_CHANGE":{
            let changes = state.taskChanges.filter(el => el.fieldName !== action.payload).map(el => {
                return {...el};
            });
            return {...state, taskChanges: changes};
        }
        case "SAVE_TASK":
            return {...state, isChanged: false, showSaveMessage: true};
        case "HIDE_MESSAGE":
            return {...state, showSaveMessage: false};
        case "LOAD_TASK_HISTORY":
            return {...state, historyList: action.payload};
        case "ADD_COMMENT":{
            
        }
    }
    return state;
}