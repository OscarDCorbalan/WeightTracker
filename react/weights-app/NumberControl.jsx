'use strict';
import React from 'react';

class NumberControl extends React.Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="input-group">
                <span className="input-group-addon">{this.props.name}</span>
                <input type="number" id={this.props.id} className="form-control" placeholder={this.props.placeholder} min={this.props.min} max={this.props.max} required/>
            </div>
        );
    }
}

export default NumberControl
