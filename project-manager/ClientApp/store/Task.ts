import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import { Task } from '../models';

export interface TaskState {
    currentTask: Task
}

const initialState: TaskState = {
    currentTask: null
}

interface loadTask {
    type: 'LOAD_TASK',
    payload: Task
}

export const actionCreators = {

}

export const reducer: Reducer<TaskState> = (state: TaskState = initialState, incomingAction: Action) => {
    return state;
}