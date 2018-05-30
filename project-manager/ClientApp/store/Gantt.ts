import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {BoardModel, Task} from '../models';

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
    type: "LOAD_GANTT_TASKS",
    payload: {
        data: any[],
        links: any[]
    }
}

const loadTasks = (): AppThunkAction<LoadTasks> => (dispatch: any, getState: Function) => {
    callApi('api/Tasks/gantt')
    .then(response => response.json())
    .then(data => {
        dispatch({type: "LOAD_GANTT_TASKS", payload: data})
    })
}

export const ActionCreators = {
    loadTasks: loadTasks,
    addLink: (link: any): AppThunkAction<LoadTasks> => (dispatch: any, getState: Function) => {
        const payload = {
            fromid : link.source,
            toid : link.target,
            type : link.type
        };
        const requestData = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json;'
            }
        };
        callApi('api/links', requestData)
        .then(response => {
            if(response.ok){
                dispatch(loadTasks());
            }else{
                console.log(response.statusText);
            }
        })
    },
    resizeTask: (id: any, event: any): AppThunkAction<LoadTasks> => (dispatch: any, getState: Function) => {
        console.log(event);
    },
    addTask: (task: any): AppThunkAction<LoadTasks> => async (dispatch: any, getState: Function) => {
        let payload: Task  = {
            start: task.start_date,
            end: task.end_date,
            title: task.text,
            description: task.text,
            statusID: 1
        };
        let requestData = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        let project = getState().project.currentProject;
        let projectID = project ? project.projectID : 1;
        await callApi(`api/Tasks/${projectID}`, requestData)
        let response = await callApi('api/Tasks/gantt');
        let tasks = await response.json();
        dispatch({type: "LOAD_GANTT_TASKS", payload: tasks})
    },

    deleteTask: (id: number): AppThunkAction<LoadTasks> => async (dispatch: any, getState: Function) => {
        const requestData = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        callApi(`api/tasks/${id}`, requestData);
    }
}

type KnownAction = LoadTasks;

export const reducer: Reducer<GanttState> = (state: GanttState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case 'LOAD_GANTT_TASKS':
        console.log(action.payload);
            return {...state, tasks: action.payload }
        default:
            return state;
    }
}