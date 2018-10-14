//weatherTable.jsx

import React from 'react';
import PropTypes from 'prop-types';

import {
    Row,
    Col,
} from 'reactstrap';


import './WeatherTable.css'

export default class WeatherTable extends React.Component {
    static propTypes = {
        masking: PropTypes.bool,
        groups: PropTypes.array,
        descriptions: PropTypes.array,
        temps: PropTypes.array,
        unit: PropTypes.string
    };

    constructor(props) {
        super(props);

    }

    render() {

        let foreCastObjList = this.props.foreCastObjList;
        console.log(foreCastObjList);
        let days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thrus', 'Fri', 'Sat'];
        if (!foreCastObjList[1]) return <div />;

        return ( 
            <div className={`weather-table ${this.props.masking
                ? 'masking'
                : ''}`}>
                <Row className="text-center">
                  <Col>
                      {days[foreCastObjList[1].dates.getDay()]}<br />
                      <i className={`owf owf-${foreCastObjList[1].codes} owf-3x`}></i><br />
                      {foreCastObjList[1].temp}&ordm;{(this.props.unit === 'metric') ? 'C' : 'F'}
                  </Col>
                  <Col>
                      {days[foreCastObjList[3].dates.getDay()]}<br />
                      <i className={`owf owf-${foreCastObjList[3].codes} owf-3x`}></i><br />
                      {foreCastObjList[3].temp}&ordm;{(this.props.unit === 'metric') ? 'C' : 'F'}
                  </Col>
                  <Col className="hidden-sm-down">
                      {days[foreCastObjList[5].dates.getDay()]}<br />
                      <i className={`owf owf-${foreCastObjList[5].codes} owf-3x`}></i><br />
                      {foreCastObjList[5].temp}&ordm;{(this.props.unit === 'metric') ? 'C' : 'F'}
                  </Col>
                  <Col className="hidden-sm-down">
                      {days[foreCastObjList[6].dates.getDay()]}<br />
                      <i className={`owf owf-${foreCastObjList[6].codes} owf-3x`}></i><br />
                      {foreCastObjList[6].temp}&ordm;{(this.props.unit === 'metric') ? 'C' : 'F'}
                  </Col>
                </Row>
            </div>
        );
    }


    
}