import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {GoogleImport} from '../helpers/import';
import {GoogleEvent, GoogleUser} from '../models/index';

export interface ImportState{
    googleLoaded: boolean;
}

const initialState: ImportState = {
    googleLoaded: false
}

interface LoadGoogleTasks{
    type: "LOAD_TABLE_TASKS",
    payload: any[]
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

        callApi('api/import/gevents', requestData).then(response => {
            console.log('end import.');
        });
    };
    googleClient.signIn();
}
export const actionCreators = {
    loadGoogleTasks: loadGoogleTasks,
    init: (): AppThunkAction<LoadGoogleTasks> => (dispatch: any, getState: Function) => {
        //console.log('init');
        googleClient.init();
    }
}

export const reducer:Reducer<ImportState> = (state: ImportState = initialState, incomingAction: Action) => {
    return initialState;
}