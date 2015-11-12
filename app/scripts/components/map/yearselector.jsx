import React from 'react';
import { setYear } from '../../actions/regions';
const yearSelector = React.createClass({

  getInitialState() {
    return {
      value: '2010',
    };
  },

  change(event) {
    this.state.value = event.target.value;
    setYear(null, event.target.value);
  },

  render() {
    return (
         <select className="selectable" id="year" onChange={this.change} value={this.state.value} >
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
           </select>
        );
  },
});

export default yearSelector;
