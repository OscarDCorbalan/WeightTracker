'use strict';
import React from 'react';
import DateControl from './DateControl';
import NumberControl from './NumberControl';

class InputWeightControl extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                <DateControl minDate="2015-10-01" maxDate="2020-11-30"/>
                <br/>
                <NumberControl name="Weight" id="form-weight" placeholder="Weight in kilograms" type="number" min="40" max="150"/>
                <br/>
                <button className="btn btn-default" onClick={this.props.onClick}>
                    <span className="glyphicon glyphicon-save" aria-hidden="true"></span>Add
                </button>
                <br/>
            </div>
        );
    }
}

export default InputWeightControl
