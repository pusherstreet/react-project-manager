import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {Configuration} from '../models/index';
import { FormEvent } from 'react';

export interface configurationState{
    configurationLoaded: boolean,
    configuration: Configuration | null,
    changed: boolean
}

const initialState: configurationState = {
    configuration: null,
    configurationLoaded: false,
    changed: false
}

interface LoadConfiguration{
    type: "LOAD_CONFIGURATION_DATA",
    payload: Configuration
}
interface ChangeTheme{
    type: "CHANGE_THEME",
    theme: string
}

const load = () : AppThunkAction<LoadConfiguration> => (dispatch: any, getState: Function) => {
    callApi('api/configuration')
    .then(response => response.json())
    .then(data => {
        const payload:Configuration = {
            Theme: data.theme,
            Notifications: data.notifications,
            ConfigurationID : data.configurationID,
            UserID: data.userID
        };
        dispatch({type: "LOAD_CONFIGURATION_DATA", payload: payload});
    })
}
export const actionCreators = {
    load : load,
    changeTheme : (theme: string) => (dispatch: any) => {
        dispatch({type: 'CHANGE_THEME', theme: theme});
    },
    saveConfiguration: (configuration: Configuration) : AppThunkAction<LoadConfiguration> => (dispatch: any, getState: Function) =>{
        const requestData = {
            method: 'PUT',
            body: JSON.stringify(configuration),
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        callApi('api/configuration', requestData)
        .then(response => {
            load();
        })
    }
}

type KnownAction = LoadConfiguration & ChangeTheme;

export const reducer:Reducer<configurationState> = (state: configurationState = initialState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case "LOAD_CONFIGURATION_DATA":
            return {...state, configurationLoaded: true, configuration: action.payload, changed: false};
        case "CHANGE_THEME":
            let configuration = {...state.configuration};
            configuration.Theme = action.theme;
            return {...state, configuration: configuration, changed: true}          
    }
    return state;
}