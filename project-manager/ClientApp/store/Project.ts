import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';

export interface ProjectState{
    projectList: any[];
    currentProject: any;
}

const initialState : ProjectState = {
    projectList: [],
    currentProject: null
}

interface LoadProjects{
    type: "LOAD_PROJECTS";
    payload: any[];
}
interface CurrentProject{
    type: "CURRENT_PROJECT";
    payload: any;
}

export const actionCreators = {
    loadProjects: (): AppThunkAction<LoadProjects> => (dispatch: any, getState: Function) => {
        callApi('api/projects')
        .then(response => response.json())
        .then(data => {
            dispatch({type: "LOAD_PROJECTS", payload: data});
        });
    },
    setCurrentProject: (project: any): AppThunkAction<CurrentProject> => (dispatch: any, getState: Function) => {
        dispatch({type: "CURRENT_PROJECT", payload: project});
    }
}

type KnownAction = LoadProjects & CurrentProject;

export const reducer : Reducer<ProjectState> = (state: ProjectState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case "LOAD_PROJECTS":
            return {...state, projectList: action.payload, currentProject: action.payload[0]};
        case "CURRENT_PROJECT":
            return {...state, currentProject: action.payload};
    }
    return state;
}