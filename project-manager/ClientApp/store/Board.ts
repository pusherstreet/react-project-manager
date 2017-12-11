import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {BoardModel} from '../models';


export interface BoardState{
    boards: any[];
}

const boards: any  = {
	lanes: [
		{
		id: '1',
		title: 'Done',
		label: '0',
		cards: []
		},
		{
		id: '2',
		title: 'Created',
		label: '0',
		cards: []
		},
		{
		id: '3',
		title: 'Canceled',
		label: '0',
		cards: []
		},
		{
		id: '4',
		title: 'Approved',
		label: '0',
		cards: []
		}
	]
}

//actions
interface FetchBoards{
    type: "FETCH_BOARDS",
    payload: any[]
}

const loadBords = (): AppThunkAction<FetchBoards> => (dispatch: any, getState: Function) => {
    callApi('api/Tasks/boards')
    .then(response => response.json())
    .then(data => {
        let lanes = boards.lanes.map((lane: any) => {
            let board = data.find((b: any) => b.key.statusID.toString() == lane.id);
            
            let cards = board ? board.value.map((card: any) => {
                let days = Math.ceil(Math.abs(new Date(card.end).getTime() - new Date(card.start).getTime()) / (1000 * 3600 * 24));
                return {
                    id: card.taskID.toString(),
                    title: card.title,
                    description: card.description,
                    label:  `${days} day${days > 1 ? 's' : ''}`,
                }
            })  : [];
            lane.label = `${cards.length} task${cards.length != 1 ? 's': ''}`;
            lane.cards = cards;
            return lane;
        });
        let payload = {
            lanes: lanes
        }
        dispatch({type: "FETCH_BOARDS", payload: payload})
    })
}
// action creators
export const actionCreators = {
    loadBoards: loadBords,
    moveCard: (id: string, source: string, target: string): AppThunkAction<FetchBoards> => (dispatch: any, getState: Function) => {
        let requestData = {
            method: 'PUT',
            body: JSON.stringify(target),
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        callApi(`api/Tasks/setstatus/${id}`, requestData)
        .then(respose => {
            if(respose.ok){
                dispatch(loadBords());
            }
            else{
                console.log(respose.statusText);
            }
        })
        
    }
}

type KnownAction = FetchBoards;

export const reducer: Reducer<BoardState> = (state: BoardState = {boards: boards}, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch(action.type){
        case "FETCH_BOARDS":
            return {...state, boards: action.payload};
        default:
            return state;
    }
}