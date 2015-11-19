import React from 'react';
import T from '../misc/t';
import { connect } from 'reflux';
import legendStore from '../../stores/legend';

require('stylesheets/misc/legend');

const legend = React.createClass({

  mixins: [
    connect(legendStore, 'legend'),
  ],

  render() {
    return (
        <div className="legend">
          <div className="title"><T k="legend.title" /></div>
          <div>
            <div className="legend-block" style={{'background': this.state.legend.classOne}}></div>
            {this.state.legend.rangeOne}
          </div>
          <div>
            <div className="legend-block" style={{'background': this.state.legend.classTwo}}></div>
            {this.state.legend.rangeTwo}
          </div>
          <div>
            <div className="legend-block" style={{'background': this.state.legend.classThree}}></div>
            {this.state.legend.rangeThree}</div>
          <div>
            <div className="legend-block" style={{'background': this.state.legend.classFour}}></div>
            {this.state.legend.rangeFour}</div>
          <div>
            <div className="legend-block" style={{'background': this.state.legend.classFive}}></div>
            {this.state.legend.rangeFive}
          </div>
          <div>
            <div className="legend-block" style={{'background': this.state.legend.classSix}}></div>
            {this.state.legend.rangeSix}
          </div>
        </div>

    );
  },
});

export default legend;

