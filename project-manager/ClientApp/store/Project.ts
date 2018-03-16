import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import { Task } from '../models';

export interface ProjectState{
    projectList: any[];
    currentProject: any;
    tasks: Task[]
}

export const initialState : ProjectState = {
    projectList: [],
    currentProject: null,
    tasks: [],
}

interface LoadProjects{
    type: "LOAD_PROJECTS";
    payload: any[];
}
interface CurrentProject{
    type: "CURRENT_PROJECT_CHANGE";
    project: any;
    tasks: Task[];
}
interface AddTask{
    type: "ADD_TASK",
    task: Task
}
interface UpdateTask{
    type: "UPDATE_CALENDAR_TASK",
    task: Task
}

export const actionCreators = {
    loadProjects: (): AppThunkAction<LoadProjects> => (dispatch: any, getState: Function) => {
        callApi('api/projects')
        .then(response => response.json())
        .then(data => {
            dispatch({type: "LOAD_PROJECTS", payload: data});
            let project = data[0];
            if(project){
                callApi(`api/tasks/list/${project.projectID}`)
                .then(response => response.json())
                .then(tasks => {
                dispatch({type: 'CURRENT_PROJECT_CHANGE', project: project, tasks: tasks}); 
            });
            }
        });
    },
    setCurrentProject: (project: any): AppThunkAction<CurrentProject> => (dispatch: any, getState: Function) => {
        if(getState().project.currentProject.projectID !== project.projectID){
            callApi(`api/tasks/list/${project.projectID}`)
            .then(response => response.json())
            .then(data => {
                dispatch({type: "CURRENT_PROJECT_CHANGE", project: project, tasks: data});
            });
        }
    },
    updateTask: (task: Task): AppThunkAction<any> => (dispatch: any, getState: Function) => {
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
    addTask: (task: Task): AppThunkAction<any> => (dispatch: any, getState: Function) => {
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

type KnownAction = LoadProjects & CurrentProject & AddTask;

export const reducer : Reducer<ProjectState> = (state: ProjectState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case "LOAD_PROJECTS":
            return {...state, projectList: action.payload };
        case "CURRENT_PROJECT_CHANGE":
            return {...state, currentProject: action.project, tasks: action.tasks};
            case 'ADD_TASK':
            let newArray = state.tasks.slice();
            newArray.push(action.task);
            return {...state, tasks: newArray};
        case 'UPDATE_CALENDAR_TASK':
            let updateArray = state.tasks.map((el: any) => {
                if(el.taskID !== action.task.taskID){
                    return el;
                }
                return {
                    ...el,
                    ...action.task
                }
            })
            return {...state, tasks: updateArray};
    }
    return state;
}