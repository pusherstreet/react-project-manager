import * as React from 'react';
import { TaskHistory } from '../../models/index';
import { Right } from 'react-bootstrap/lib/Media';
import {getTaskHistoryHtml} from '../../helpers/html';

export default class HistoryList extends React.Component<{historyList: TaskHistory[]}, {}>{
    render(){
        const orderedList = this.props.historyList.sort((a, b) => {
            const left = new Date(a.created);
            const right = new Date(b.created);

            if(left > right) return -1;
            if(left < right) return 1;
            return 0;
        });
        return <div>
        {orderedList.map((el: TaskHistory) => {
            return getTaskHistoryHtml(el);
        })}
        </div>
    }
}