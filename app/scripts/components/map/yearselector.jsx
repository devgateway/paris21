import React from 'react';
import { connect } from 'reflux';
import selectYear  from '../../actions/years';
import { setYear } from '../../actions/regions';
import Years from '../../stores/years';

const yearSelector = React.createClass({

  mixins: [
    connect(Years, 'years'),
  ],

  getInitialState() {
    return {
      value: '2011',
    };
  },

  change(event) {
    event.preventDefault();
    selectYear(event.target.value);
    setYear(null,  event.target.value);
  },

  render() {
    return (
         <select className="selectable" id="year" onChange={this.change} value={this.state.years}>
              <option value="all">All</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
           </select>
        );
  },
});

export default yearSelector;
