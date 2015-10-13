import React, { PropTypes } from 'react';

require('stylesheets/layout.scss');

const Root = React.createClass({
  propTypes: {
    children: PropTypes.node.isRequired,
  },
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  },
});

export default Root;
