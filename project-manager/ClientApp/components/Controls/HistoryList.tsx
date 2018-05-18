import * as React from 'react';
import { TaskHistory } from '../../models/index';

export default class HistoryList extends React.Component<{historyList: TaskHistory[]}, {}>{
    render(){
        return <div>
        {this.props.historyList.map((el: TaskHistory) => {
            return <div key={el.taskHistoryID}>
                {el.message}
            </div>
        })}
        </div>
    }
}