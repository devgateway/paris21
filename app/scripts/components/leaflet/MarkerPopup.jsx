import React from 'react';
import T from '../misc/t';

require('stylesheets/leaflet/popup');

class MarkerPopup extends React.Component {
  render() {
    return (
      <div>
        <div>
        <h3><T k="popup.header" /></h3>
          <T k="popup.title"/> : {this.props.title}
          <br/>
          <T k="popup.donors"/> : {this.props.donors}
          <br/>
          <T k="popup.totalcommitments"/> : {this.props.commitments} CFA
          <br/>
          <T k="popup.totaldisbursements"/> : {this.props.disbursement} CFA
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
