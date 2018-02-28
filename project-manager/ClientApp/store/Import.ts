import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {GoogleImport} from '../helpers/import';
import {GoogleEvent, GoogleUser} from '../models/index';

export interface ImportState{
    googleLoaded: boolean;
    events: GoogleEvent[]
}

const initialState: ImportState = {
    googleLoaded: false,
    events: []
}

interface LoadGoogleTasks{
    type: "LOAD_GOOGLE_EVENTS",
    payload: GoogleEvent[]
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
        console.log(gevents);
        const requestData = {
            method: 'POST',
            body: JSON.stringify(gevents),
            headers: {
                'Content-Type': 'application/json;'
            }
        };

        callApi('api/import/gevents', requestData).then(response => {
            console.log(gevents.length);
            dispatch({type: "LOAD_GOOGLE_EVENTS", payload: gevents});
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

type KnownAction = LoadGoogleTasks;

export const reducer:Reducer<ImportState> = (state: ImportState = initialState, incomingAction: Action) => {
    let action = incomingAction as KnownAction;
    switch(action.type){
        case "LOAD_GOOGLE_EVENTS":
        return {...state, events: action.payload, googleLoaded : true};
    }
    return initialState;
}