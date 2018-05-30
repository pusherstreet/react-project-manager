import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as HomeStore from '../store/Home';
import { actionCreators } from '../store/Auth';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../css/home.css';
import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';
import TaskModal from './TaskModal';
import { Button } from 'react-bootstrap';
import AddTaskModal from './AddTaskModal';
import {GoogleImport} from '../helpers/import';
import {getDateDiffInDays} from '../helpers/dateHelper';
import * as Project from '../store/Project';

type HomeProps = ApplicationState & typeof HomeStore.actionCreators & typeof actionCreators & RouteComponentProps<{}> & Project.ProjectState & typeof Project.actionCreators;
BigCalendar.momentLocalizer(moment);

class Home extends React.Component<HomeProps, {}> {
    componentDidMount(){
        this.props.loadData();
    }
    EventColor: '#3174ad'

    eventGetter = (event, start: Date, end: Date, isSelected, slotStart: Date, slotEnd: Date) => { // dont ask me why and how
        
        const defaultSettings = {};

        if(event.status == 1 && event.actualEnd >= event.end){  
            return defaultSettings;
        }

        if(event.actualEnd >= slotEnd){
            return defaultSettings;
        }

        const startDate = slotStart > event.start ? slotStart: event.start;
        slotEnd.setDate(slotEnd.getDate() - 1) // fix bug
        const endDate = slotEnd < event.end ? slotEnd : event.end;

        const allDays = getDateDiffInDays(endDate, startDate);
        const actualDays = getDateDiffInDays(event.actualEnd, startDate);

        const leftPercent = (actualDays / allDays) * 100;

        const background = `linear-gradient(to right, #3174ad ${leftPercent}% , red ${0}%)`;
        console.log(background);

        return {style: {background: background}};
    }
    public render() {
        let tasks = this.props.project.tasks.map(el => {
            return {
                id: el.taskID,
                title: el.title,
                start: new Date(el.start.toString()),
                actualEnd: new Date(el.end.toString()),
                end: el.statusID == 1 ? new Date(el.end.toString()) : new Date(),  // поки тільки для візуального еффекту
                status: el.statusID
            }
        })
        
        return <div>

            <h1>Calendar</h1>
            <div className="top-panel">
                <AddTaskModal  onAdd ={this.props.addTask}/>
            </div>
            
            <BigCalendar 
                events={tasks} 
                onSelectEvent={(event) => this.props.selectTask(event.id)} 
                startAccessor='start' 
                endAccessor='end' 
                style={{ height: 800 }}
                eventPropGetter={this.eventGetter}
             />
            <TaskModal />
        </div>
    }
}


export default connect(
    (state: ApplicationState) => state,
    { loadData: Project.actionCreators.loadTasks, 
        login: actionCreators.login, 
        selectTask: HomeStore.actionCreators.selectTask,
        addTask :  Project.actionCreators.addTask,
        closeModal : Project.actionCreators.closeTask
    }
)(Home) as typeof Home;
