'use strict';
import React from 'react';
import { LineChart } from 'react-d3';

class WeightsApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {weights:[], mean: 0};
    }

    componentWillMount() {
        var arWeights = [];
        fetch('http://localhost/oscardc/weights')
        .then((response) => {
            return response.json();
        })
        .then((weights) => {
            var min = weights[0];
            var max = weights[0];
            var total = 0;

            // Get the needed data
            arWeights = weights.map((elem) => {
                // Delete get the date and weight
                var entry = {
                    weight: elem.weight,
                    year: elem._id.year,
                    month: elem._id.month,
                    day: elem._id.day,
                };

                // Check for min and max weight to mark them later
                if(elem.weight < min.weight) min = entry;
                if(elem.weight > max.weight) max = entry;
                total += elem.weight;

                // Return de weigth entry
                return entry;
            });

            // Add a flag to min/max entries
            min.min = true;
            max.max = true;

            // Set state
            this.setState({
                weights: arWeights,
                mean: total / weights.length
            });
        });
    }

    render(){
        console.log('render', this.state);
        if(this.state.weights.length === 0) {
            return <p className="text-center">Loading weights...</p>;
        }
        // else
        // Chart data
        const chartViewBox = {x: 0, y: 0, width: 1000, height: 400};
        var chartData = this._getChartData();
        return (
            <div>
                <h2>Your weight chart</h2>
                <LineChart legend={true} data={chartData} width={1000} height={400} viewBoxObject={chartViewBox}
                    yAxisLabel="Weight" xAxisLabel="Date" gridHorizontal={true} />
                <h2>Your weight table</h2>
                <table className="table table-condensed">
                    <thead>
                        <tr>
                            <th>Tools</th>
                            <th>Weight</th>
                            <th>Year</th>
                            <th>Month</th>
                            <th>Day</th>
                        </tr>
                    </thead>
                    <tbody>
                         {this.state.weights.map(this._renderRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }

    _renderRow(elem, index){
        let key = elem.year+'-'+elem.month+'-'+elem.day;

        // type: Bootstrap row class
        let type = '';
        if(!!elem.min && !elem.max) type = 'success'; // The double check should avoid strange behaviour when there's only one row
        if(!!elem.max && !elem.min) type = 'danger';

        return (
           <tr key={key} className={type}>
               <td>
                   <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span>
                   <button onClick={this._removeValue}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
               </td>
               <td>{elem.weight}</td>
               <td>{elem.year}</td>
               <td>{elem.month}</td>
               <td>{elem.day}</td>
           </tr>
       );
    }

    _removeValue(e){
        const marker = e.dispatchMarker;
        var key = marker.indexOf('$');
        key = marker.substr(key+1, 10);
        if(key.charAt(6) === '-') key = key.substr(0,key.length-1);
        var date = new Date(key);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();
        const url = '/oscardc/weights/'+year+'/'+month+'/'+day+'/';
        fetch(url, {method: 'delete'})
        .then(response => {
            console.log(response);
        })


        //this.setState({items: nextItems, text: nextText});
    }

    _getChartData(){
        let _parseEntryDate = (entry) => new Date(entry.year, entry.month-1, entry.day, 0, 0, 0);

        const mean = this.state.mean;
        const weights = this.state.weights;

        // We only need two points to plot the mean-weight line
        var arMean =  [{
                x: _parseEntryDate( weights[weights.length-1] ),
                y: mean
            },{
                x: _parseEntryDate( weights[0] ),
                y: mean
        }];

        // Iterate the weight entries to create the graph points
        var arWeights = weights.reverse().map((elem,index) => ({
            x: _parseEntryDate( elem ),
            y: elem.weight
        }));

        return  [{
            name: 'Day\'s weight',
            values: arWeights,
            strokeWidth: 2
        },{
            name: 'Mean weight',
            values: arMean,
            strokeWidth: 1,
            strokeDashArray: '4,4'
        }];
    }

}

export default WeightsApp
