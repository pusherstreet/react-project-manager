import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {Task} from '../models';

export interface HomeState {
    tasks: Task[];
    selectedTask: any | null;
    fetchedProject: number | null;
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
interface AddTask{
    type: "ADD_TASK",
    task: Task
}
interface UpdateTask{
    type: "UPDATE_CALENDAR_TASK",
    task: Task
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
                dispatch({type: 'CLOSE_CALENDAR_TASK'});
                dispatch({type: 'UPDATE_CALENDAR_TASK', task: task});
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
        let project = getState().project.currentProject;
        let projectID = project ? project.projectID : 1;
        callApi(`api/Tasks/${projectID}`, requestData)
        .then(response => response.json())
        .then(data => {
            dispatch({type: "ADD_TASK", task: data});
        })
    }
}

type KnownAction = ReceiveData & SelectTask & AddTask;

export const reducer: Reducer<HomeState> = (state: HomeState = {tasks: [], selectedTask: null, fetchedProject: null} , incomAction: Action) => {
    const action = incomAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_CALENDAR_TASKS':
            return {...state, tasks: action.tasks, fetchedProject: action.fetchedProject } ;
        case 'SELECT_CALENDAR_TASK':
            return {...state, selectedTask: action.task};
        case 'CLOSE_CALENDAR_TASK':
            return {...state, selectedTask: null};
        case 'ADD_TASK':
            let newArray = state.tasks.slice();
            newArray.push(action.task);
            return {...state, tasks: newArray};
        case 'UPDATE_CALENDAR_TASK':
            let updateArray = state.tasks.map(el => {
                if(el.taskID !== action.task.taskID){
                    return el;
                }
                return {
                    ...el,
                    ...action.task
                }
            })
            return {...state, tasks: updateArray};
            
        default:
            return state;
    }
}