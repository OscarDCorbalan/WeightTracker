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

    renderWeightRows(){

    }
    render(){
        console.log('render', 'before', this.state);
                    //<WeightRow listado={this.state.weights} />
        if(this.state.weights.length === 0) {
            return <p className="text-center">Loading weights...</p>;
        }
        // else
        return (
            <div className="container">
                <table className="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>Year</th><th>Month</th><th>Day</th><th>Weight</th>
                        </tr>
                    </thead>
                    <tbody>
                         {this.state.weights.map(function(elem, index){
                            let date = new Date(elem.date);
                            return (
                                <tr key={index}>
                                    <td>{date.getFullYear()}</td>
                                    <td>{date.getMonth()}</td>
                                    <td>{date.getDate()}</td>
                                    <td>{elem.weight}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
        console.log('render', 'after');
    }

}

export default WeightsApp
