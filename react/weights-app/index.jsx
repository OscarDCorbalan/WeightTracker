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
        console.log('render', this.state);
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
                         {this.state.weights.map(this._renderRow)}
                    </tbody>
                </table>
            </div>
        );
    }

    _renderRow(elem, index){
       let date = new Date(elem.date);
       let year = date.getFullYear();
       let month = date.getMonth();
       let day = date.getDate();
       let key = year+'-'+month+'-'+day;
       return (
           <tr key={key}>
               <td>{year}</td>
               <td>{month}</td>
               <td>{day}</td>
               <td>{elem.weight}</td>
           </tr>
       );
    }

}

export default WeightsApp
