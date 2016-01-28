import React from 'react';
import showStructures from  '../../actions/showstructures';

const StructuresSelector = React.createClass({

  componentDidMount() {
    this.props.status = false;
  },

  change() {
    this.props.status = !this.props.status;
    showStructures(this.props.status);
  },

  render() {
    return (<input type="checkbox" value="false" name="showstructures" onChange={this.change}/>);
  },
});

export default StructuresSelector;