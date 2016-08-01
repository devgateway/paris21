import React from 'react';
import T from '../misc/t';

require('stylesheets/leaflet/popup');

class MarkerPopup extends React.Component {
  render() {
    return (
      <div className = "projectinfo">
        <div>
          <h3><T k="popup.header" /></h3>
          <T k="popup.title" /> : {this.props.title}
          <hr></hr>
          <T k="popup.description" /> : {this.props.description}
          <br/>
          <T k="popup.sector" /> : {this.props.sector}
          <br/>
          <T k="popup.donors" /> : {this.props.donors}
          <br/>
          <T k="popup.startdate" /> : {this.props.startdate}
          <br/>
          <T k="popup.enddate" /> : {this.props.enddate}
          <br/>
          <T k="popup.totalcommitments" /> : {this.props.commitments} CFA
          <br/>
          <T k="popup.totaldisbursements" /> : {this.props.disbursement} CFA
          <br/>
          <br/>
          <a href={`http://pgfe.finances.gouv.sn/aim/viewActivityPreview.do~public=true~pageId=2~activityId=${this.props.ampid}`}>More Information</a>
          <br/>
        </div>
      </div>
    );
  }
}

MarkerPopup.propTypes = {
  ampid: React.PropTypes.string.isRequired,
  commitments: React.PropTypes.string.isRequired,
  description: React.PropTypes.string.isRequired,
  disbursement: React.PropTypes.string.isRequired,
  donors: React.PropTypes.string.isRequired,
  enddate: React.PropTypes.string.isRequired,
  sector: React.PropTypes.string.isRequired,
  startdate: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
};

export default MarkerPopup;
