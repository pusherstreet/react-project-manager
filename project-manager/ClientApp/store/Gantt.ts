import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {BoardModel} from '../models';

export interface GanttState{
    tasks: {
        data: any[],
        links: any[]
    }
}

const initialState: GanttState = {
    tasks : {
        data: [],
        links: []
    }
}

interface LoadTasks{
    type: "LOAD_TASKS",
    payload: {
        data: any[],
        links: any[]
    }
}

const loadTasks = (): AppThunkAction<LoadTasks> => (dispatch: any, getState: Function) => {
    callApi('api/Tasks/gantt')
    .then(response => response.json())
    .then(data => {
        dispatch({type: "LOAD_TASKS", payload: data})
    })
}

export const ActionCreators = {
    loadTasks: loadTasks
}

type KnownAction = LoadTasks;

export const reducer: Reducer<GanttState> = (state: GanttState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case 'LOAD_TASKS':
        console.log(action.payload);
            return {...state, tasks: action.payload }
        default:
            return state;
    }
}