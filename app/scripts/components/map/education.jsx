import React,  { PropTypes } from 'react';
import T from '../misc/t';
import mainmap from './mainmap';

const education = React.createClass({
  propTypes: {
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  },
  render() {
    return (
      <education>
        <h1>
          <T k="dash.waterpoint" />
          {' '}
          <small>{this.props.params.id}</small>
        </h1>
      </education>
    );
  },
});

export default education;