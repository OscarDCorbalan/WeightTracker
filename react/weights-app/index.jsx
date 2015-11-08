'use strict';
import React from 'react';

class WeightsApp extends React.Component {
/*    constructor(props) {
        super(props)
        this.state = { weights: [] }
    }

    componentWillMount() {
        fetch('http://localhost/oscardc/weights')
        .then(function(response){
            return response.json();
        })
        .then(function(weights){
            // delete _id and instead just save the date, removing the user name
            weights.forEach(function(elem){
                elem.date = elem._id.date;
                delete elem._id;
            });
            this.setState({ weights: weights })
        });
    }*/

    render(){
        /*if(this.state.weights.length > 0) {
            return (
                <div className="container-fluid">
                <EmpleadoList listado={this.state.empleados} />
                </div>
            )
        } else {*/
            return <p className="text-center">loading weights...</p>
        //}
    }

}

export default WeightsApp
