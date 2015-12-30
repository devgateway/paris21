import React from 'react';
import { connect } from 'reflux';
import { filter } from '../../actions/structures';
import Structures from '../../stores/structures';

const ProjectFilter = React.createClass({

  mixins: [
    connect(Structures, 'structures'),
  ],

  getInitialState() {
    return {
      value: 'All',
    };
  },

  change(event) {
    event.preventDefault();
    filter(event.target.value);
    this.value = event.target.value;
  },

  render() {
    return (
     <select className="selectable" onChange={this.change} value={this.value}>
     <option value="All">All</option>
     <option value="Primary">Primary</option>
     <option value="Secondary">Secondary</option>
     <option value="Preschool">Preschool</option>
     </select>
     );
  },
});

export default ProjectFilter;
