import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {Configuration} from '../models/index';

export interface configurationState{
    configurationLoaded: boolean,
    configuration: Configuration | null
}

const initialState: configurationState = {
    configuration: null,
    configurationLoaded: false
}

interface LoadConfiguration{
    type: "LOAD_CONFIGURATION_DATA",
    payload: Configuration
}

export const actionCreators = {

}

type KnownAction = LoadConfiguration

export const reducer:Reducer<configurationState> = (state: configurationState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case "LOAD_CONFIGURATION_DATA":
            return {...state, configurationLoaded: true, configuration: action.payload};
    }
    return state;
}