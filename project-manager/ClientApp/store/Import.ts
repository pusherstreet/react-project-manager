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
        });
        let project = getState().project.currentProject;
        const payload = {
            projectID: project.projectID,
            events: gevents
        };
        const requestData = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json;'
            }
        };
        callApi(`api/import/gevents`, requestData)
        .then(response => {
            dispatch({type: "LOAD_GOOGLE_EVENTS", payload: gevents});
            return response.json();
        })
        .then(data => {
            dispatch({type: "RECEIVE_IMPORT_RESULT", payload: data});
        });
    };
    googleClient.signIn();
}
export const actionCreators = {
    loadGoogleTasks: loadGoogleTasks,
    init: (): AppThunkAction<LoadGoogleTasks> => (dispatch: any, getState: Function) => {
        googleClient.init();
    },
    importExcel: (file: File) : AppThunkAction<LoadGoogleTasks> => (dispatch: any, getState: Function) => {
        let project = getState().project.currentProject;
        if(project){
            const formData = new FormData();
            formData.append('name', 'import.xlsx');
            formData.append('file', file);
            const payload = formData;
            const requestData = {
                method: 'POST',
                body: formData
            }
            callApi(`api/import/excel/${project.projectID}`, requestData)
            .then(response => response.json())
            .then(data => {
                dispatch({type: "RECEIVE_IMPORT_RESULT", payload: data});
            })
        }
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