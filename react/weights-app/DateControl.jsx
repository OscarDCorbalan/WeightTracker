'use strict';
import React from 'react';

class DateControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="input-group">
                <span className="input-group-addon">Date</span>
                <input id="form-date" className="form-control" type="date" min={this.props.minDate} max={this.props.maxDate} required/>
            </div>
        );
    }
}

export default DateControl
