'use strict';
import React from 'react';
import { LineChart } from 'react-d3';
import DateControl from './DateControl';
import NumberControl from './NumberControl';
import InputWeightControl from './InputWeightControl';

//var a = 0;
class WeightsApp extends React.Component {
    constructor(props) {
        super(props);
        this.setDefaultState();
        this.user = props.user
    }

    setDefaultState() {
        this.state = {weights:[], mean: 0};
    }

    componentWillMount() {
        this._fetchData();
    }

    _fetchData(){
        var arWeights = [];
        const url = [this.user, 'weights'].join('/');
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((weights) => {
            if(weights.length === 0){
                this.setDefaultState();
                return;
            }

            var min = weights[0];
            var max = weights[0];
            var total = 0;

            // Get the needed data
            arWeights = weights.map((elem) => {
                // Delete get the date and weight
                var entry = {
                    weight: Number(elem.weight),
                    year: Number(elem._id.year),
                    month: Number(elem._id.month),
                    day: Number(elem._id.day),
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
        //a = a + 1;
        console.log('render', this.state);

        const chartViewBox = {x: 0, y: 0, width: 1000, height: 400};
        const formDate = 'form-date';
        const formWeight = 'form-weight';
        const boundAdd = this.addValue.bind(this);

        //if(a === 2) throw new Error("a")
        if(this.state.weights.length === 0) {
            return (
                <InputWeightControl onClick={boundAdd} />
            );
        }

        // else
        // Chart data
        const chartData = this._getChartData();
        return (
            <div>
                <h2>Your progression chart</h2>
                <LineChart legend={true} data={chartData} width={1000} height={400} viewBoxObject={chartViewBox}
                    yAxisLabel="Weight" xAxisLabel="Date" gridHorizontal={true} />
                <h2>Your weights</h2>
                <InputWeightControl onClick={boundAdd} />
                <h3>Weights records</h3>
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
                         {this.state.weights.reverse().map(this._renderRow, this)}
                    </tbody>
                </table>
            </div>
        );
    }

    _renderRow(elem, index){
        let key = elem.year+'-'+elem.month+'-'+elem.day;

        // type: Bootstrap row class
        let type = '';
        //
        if(!!elem.min && !elem.max) type = 'success'; // The double check should avoid strange behaviour when there's only one row
        if(!!elem.max && !elem.min) type = 'danger';

        var boundRemove = this.removeValue.bind(this, key);
        return (
           <tr key={key} className={type}>
               <td>
                   <button onClick={boundRemove}><span className="glyphicon glyphicon-remove" aria-hidden="true"></span></button>
               </td>
               <td>{elem.weight}</td>
               <td>{elem.year}</td>
               <td>{elem.month}</td>
               <td>{elem.day}</td>
           </tr>
       );
    }

    addValue(e){
        // Jesus cries seing these document access here, but it's just a prototype project :)
        const weight = Number(document.getElementById('form-weight').value);
        const date = document.getElementById('form-date').valueAsDate;
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();

        const url = [this.user, 'weights', year, month, day, weight].join('/');

        fetch(url, {method:'put'})
        .then((response) => {
            this._fetchData();
            document.getElementById('form-weight').value = undefined;
            document.getElementById('form-date').value = undefined;
        })
    }

    removeValue(key){
        var date = new Date(key);
        const year = date.getFullYear();
        const month = date.getMonth()+1;
        const day = date.getDate();

        const url = [this.user, 'weights', year, month, day].join('/');
        fetch(url, {method: 'delete'})
        .then((response) => {
            this._fetchData();/*
            var newState = this.state;
            newState.mean *= newState.weights.length;
            newState.weights = newState.weights.filter((entry) =>{
                if(entry.year!=year || entry.month!=month || entry.day!=day) return true;
                newState.mean -= entry.weight;
                return false;
            });
            if(newState.weights.length>0) newState.mean /= newState.weights.length;
            else newState.mean = 0;
            this.setState(newState);*/
        })
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
