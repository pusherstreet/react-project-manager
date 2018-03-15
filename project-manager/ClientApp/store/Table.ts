import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';

export interface TableState{
    tableTasks: any[]
}

interface LoadTableTasks{
    type: "LOAD_TABLE_TASKS",
    payload: any[]
}

const initialState = {
    tableTasks: []
}

const loadTasks = (): AppThunkAction<LoadTableTasks> => (dispatch: any, getState: Function) => {
    let project = getState().project.currentProject;
    let projectID = project ? project.projectID : 1;
    callApi(`api/Tasks/list/${projectID}`)
    .then(response => response.json())
    .then(data => {
        dispatch({type: "LOAD_TABLE_TASKS", payload: data})
    })
}

export const actionCreators = {
    loadTableTasks: loadTasks
}

type KnownAction = LoadTableTasks;

export const reducer: Reducer<TableState> = (state: TableState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case "LOAD_TABLE_TASKS":
            return {...state, tableTasks: action.payload}
        default:
            return state;
    }
}