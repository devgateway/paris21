import React, { PropTypes } from 'react';
import showStructures from  '../../actions/showstructures';

const StructuresSelector = React.createClass({
  propTypes: {
    status: PropTypes.boolean,
  },

  componentDidMount() {
    this.props.status = false;
  },

  change() {
    this.props.status = !this.props.status;
    showStructures(this.props.status);
  },

  render() {
    return (<input name="showstructures" onChange={this.change} type="checkbox" value="false" />);
  },
});

export default StructuresSelector;
