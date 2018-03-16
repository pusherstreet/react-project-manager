import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {Task} from '../models';
import * as Project from './Project';

export interface HomeState {
    selectedTask: any | null;
}

const InitialState: HomeState = {
    selectedTask: null
}

// Actions
interface ReceiveData {
    type: "RECEIVE_CALENDAR_TASKS",
    tasks: Task[],
    fetchedProject: number
}

interface SelectTask{
    type: "SELECT_CALENDAR_TASK",
    task: Task | null
}
interface CloseTask{
    type: "CLOSE_CALENDAR_TASK"
}


// functions
const loadData = (): AppThunkAction<ReceiveData> => (dispatch: any, getState: Function) => {
    let project = getState().project.currentProject;
    let projectID = project ? project.projectID : 1;
    let fetchTask = callApi(`api/Tasks/list/${projectID}`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            dispatch({ type: 'RECEIVE_CALENDAR_TASKS', tasks: data, fetchedProject: projectID });
        });
}

// Action creators
export const actionCreators = {
    loadData: loadData,
    selectTask: (id: number): AppThunkAction<SelectTask> => (dispatch: any, getState: Function) => {
        callApi(`api/Tasks/${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: 'SELECT_CALENDAR_TASK', task: data});
        })
    },
    closeTask: (): AppThunkAction<SelectTask> => (dispatch: any, getState: Function) => {
        dispatch({type: "CLOSE_CALENDAR_TASK"})
    }
}

type KnownAction = SelectTask & CloseTask;

type State = HomeState & Project.ProjectState;
const initialState = Object.assign({}, InitialState, Project.initialState);

export const reducer: Reducer<State> = (state: State = initialState , incomAction: Action) => {
    const action = incomAction as KnownAction;
    switch (action.type) {
        case 'SELECT_CALENDAR_TASK':
            return {...state, selectedTask: action.task};
        case 'CLOSE_CALENDAR_TASK':
            return {...state, selectedTask: null};
            
        default:
            return state;
    }
}