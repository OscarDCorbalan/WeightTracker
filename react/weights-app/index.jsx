'use strict';
import React from 'react';

class WeightsApp extends React.Component {
    constructor(props) {
        console.log('constructor', 'before');
        super(props);
        this.state = {weights:[]};
        console.log('constructor', 'after');
    }

    componentWillMount() {
        console.log('componentWillMount', 'before');
        var arWeights = [];
        fetch('http://localhost/oscardc/weights')
        .then((response) => {
            return response.json();
        })
        .then((weights) => {
            // delete _id and instead just save the date, removing the user name
            arWeights = weights.map((elem) => {
                return {
                    date: elem._id.date,
                    weight: elem.weight
                };
            });
            console.log(arWeights);
            this.setState( {weights:arWeights} );
        });
        console.log('componentWillMount', 'after');
    }

    render(){
        console.log('render', 'before', this.state);
                    //<WeightRow listado={this.state.weights} />
        if(this.state.weights.length > 0) {
            return (
                <div className="container-fluid">
                    {this.state.weights[0].date}: {this.state.weights[0].weight}
                </div>
            )
        } else {
            return <p className="text-center">Loading weights...</p>
        }
        console.log('render', 'after');
    }

}

export default WeightsApp
