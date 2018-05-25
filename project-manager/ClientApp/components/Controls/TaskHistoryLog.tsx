import * as React from 'react';
import { TaskHistory, TaskChange } from '../../models';

export default class TaskHistoryLog extends React.Component<{ taskHistory: TaskHistory }, { showChanges: boolean }> {

    constructor() {
        super();
        this.state = { showChanges: false };
    }

    toggleChanges = (event) => {
        event.preventDefault();
        this.setState({ showChanges: !this.state.showChanges });
    }

    render() {
        const taskHistory = this.props.taskHistory;

        const changesCount = taskHistory.changes.length;

        const change = taskHistory.changes[0] as TaskChange;
        const action = taskHistory.message ? `added comment: ${taskHistory.message}`: change ? <span>changed  <b>{change.fieldName}</b> to <b>{change.newValue}</b></span>: '';
        const minChanges = taskHistory.message ? 0 : 1;

        const message = <span><b>{taskHistory.user.email} </b> {action} 
            {changesCount > minChanges ? <span> and <b>{changesCount}</b> other <a href="#" onClick={this.toggleChanges}>{changesCount == 1 ? "change" : "changes"}</a></span> : ""}.</span>;

        return <div className='history-summary' key={taskHistory.taskHistoryID}>
            <div className="history-text-block">
                {message}
            </div>
            <div className="history-info-block">
                {new Date(taskHistory.created).toUTCString()}
            </div>
            <div className="history-changes-block" style={{ display: this.state.showChanges ? 'block' : 'none' }}>
                <table style={{ minWidth: '70%' }}>
                    <tbody>
                        <tr style={{fontWeight: 'bold'}}>
                            <td>Field Name</td>
                            <td>Old Value</td>
                            <td>New Value</td>
                        </tr>
                        {taskHistory.changes.map((change, key) => {
                            return <tr key={key} className="history-change">
                                <td>{change.fieldName}</td>
                                <td>{change.oldValue}</td>
                                <td>{change.newValue}</td>
                            </tr>
                        })}
                    </tbody>

                </table>

            </div>
        </div>
    }
}