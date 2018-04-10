import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import callApi from '../helpers/callApi';
import {downloadFile} from '../helpers/export';

export interface ExportState{
    disableExportButton: boolean;
}

const initialState: ExportState = {
    disableExportButton: false
};

interface StartExport{
    type: "START_EXPORT"
}
interface EndExport{
    type: "END_EXPORT"
}

export const actionCreators = {
    exportTasks: (): AppThunkAction<StartExport> => (dispatch: any, getState: Function) => {
        let project = getState().project.currentProject;
        if(project){
            const requestData = {
                headers: {
                    'Response-Type': 'arraybuffer'
                }
            }
            callApi(`api/export/xlsx/${project.projectID}`)
            .then(response => response.arrayBuffer())
            .then(data => {
                const uint8 = new Uint8Array(data);
                downloadFile(uint8);
            })
        }
    }
}


export const reducer:Reducer<ExportState> = (state: ExportState = initialState, incomingAction: Action) => {
    return initialState;
}