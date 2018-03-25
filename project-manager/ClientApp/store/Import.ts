import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {GoogleImport} from '../helpers/import';
import {GoogleEvent, GoogleUser} from '../models/index';

export interface ImportState{
    status: ImportStatus;
    events: GoogleEvent[];
    importResult: any;
}
export enum ImportStatus{
    init,
    googleloaded,
    imported
}

const initialState: ImportState = {
    status: ImportStatus.init,
    events: [],
    importResult: null
}

// actions
interface LoadGoogleTasks{
    type: "LOAD_GOOGLE_EVENTS",
    payload: GoogleEvent[]
}
interface ReceiveImportResult{
    type: "RECEIVE_IMPORT_RESULT",
    payload: any
}

let googleClient = new GoogleImport();

const loadGoogleTasks = (): AppThunkAction<LoadGoogleTasks> => (dispatch: any, getState: Function) => {
    googleClient.OnListEvents = (events: any) => {

        let gevents = events.map((event:any) => {
            let gevent: GoogleEvent = {
                ID : event.id,
                Start: event.start.date,
                End: event.end.date,
                Created : event.created,
                Creator : event.creator,
                Organizer : event.organizer,
                Status : event.status,
                Summary: event.summary
            };
            return gevent;
        })
        const requestData = {
            method: 'POST',
            body: JSON.stringify(gevents),
            headers: {
                'Content-Type': 'application/json;'
            }
        };
        let project = getState().project.currentProject;
        callApi(`api/import/gevents${project ? `?projectID=${project.projectID}`: ''}}`, requestData)
        .then(response => {
            dispatch({type: "LOAD_GOOGLE_EVENTS", payload: gevents});
            return response.json();
        })
        .then(data => {
            console.log('server');
            dispatch({type: "RECEIVE_IMPORT_RESULT", payload: data});
        });
    };
    googleClient.signIn();
}
export const actionCreators = {
    loadGoogleTasks: loadGoogleTasks,
    init: (): AppThunkAction<LoadGoogleTasks> => (dispatch: any, getState: Function) => {
        googleClient.init();
    }
}

type KnownAction = LoadGoogleTasks & ReceiveImportResult;

export const reducer:Reducer<ImportState> = (state: ImportState = initialState, incomingAction: Action) => {
    let action = incomingAction as KnownAction;
    switch(action.type){
        case "LOAD_GOOGLE_EVENTS":
            return {...state, events: action.payload, status: ImportStatus.googleloaded};
        case "RECEIVE_IMPORT_RESULT":
            return {...state, importResult: action.payload, status: ImportStatus.imported }
    }
    return initialState;
}