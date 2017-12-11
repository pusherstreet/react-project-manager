import * as React from 'react';
import * as DateHelper from '../helpers/dateHelper';

export default class DateTime extends React.Component<any, {date: string, time: string}>{

    constructor(props: any){
        super();
        this.state =  {
            date: DateHelper.toInputDate(new Date(props.value)),
            time: DateHelper.toInputTime(new Date(props.value))
        }
    }
    getHtmlObj = (datetime: string) => {
        return {target: {name: this.props.name, value: datetime}}
    }

    public handleChange = (e: any) => {
        let datetime;
        if(e.target.type == 'date') { 
            this.setState({date: e.target.value})
            datetime = DateHelper.GetDateTime(e.target.value, this.state.time);
        }else{
            this.setState({time: e.target.value})
            datetime = DateHelper.GetDateTime(this.state.date, e.target.value);
        }   
        let htmlObj = this.getHtmlObj(datetime);
        this.props.onChange(htmlObj);
    }

    render(){
        return <div>
            <input type="date"  value={this.state.date} onChange={this.handleChange} style={{marginRight: "20px"}} />
            <input type="time" value={this.state.time} onChange={this.handleChange} />
        </div>
    }
}