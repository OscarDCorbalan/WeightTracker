'use strict';
import React from 'react';
import { LineChart } from 'react-d3';

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
                    date: new Date(elem._id.date),
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
        const chartViewBox = {x: 0, y: 0, width: 1000, height: 400};
        var chartData = this._getChartData();
        return (
            <div>
                <LineChart title="Your weight chart" legend={true} data={chartData} width='100%' height={400} viewBoxObject={chartViewBox}
                    yAxisLabel="Weight" xAxisLabel="Date" gridHorizontal={true} />
                <table className="table table-hover table-condensed">
                    <thead>
                        <tr>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Day</th>
                            <th>Weight</th>
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
       let date = elem.date;
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

    _getChartData(){
        var vals = this.state.weights.reverse().map(function(elem,index){
            return {
                x: elem.date,
                y: elem.weight
            };
        });
        return  [{
            name: "Weights",
            values: vals,
            strokeWidth: 2
        }];
  ;
    }

}

export default WeightsApp
