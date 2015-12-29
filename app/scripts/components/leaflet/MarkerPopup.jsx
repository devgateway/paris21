import React from 'react';

require('stylesheets/leaflet/popup');

class MarkerPopup extends React.Component {
  render() {
    return (
      <div>
        <div>
        <h3>Project Information</h3>
          Title : {this.props.title}
          <br/>
          Donors : {this.props.donors}
          <br/>
          Total Commmitment : {this.props.commitments} CFA
          <br/>
          Total Disbursement : {this.props.disbursement} CFA
        </div>
      </div>
    );
  }
}

MarkerPopup.propTypes = {
  commitments: React.PropTypes.string.isRequired,
  disbursement: React.PropTypes.string.isRequired,
  donors: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default MarkerPopup;
