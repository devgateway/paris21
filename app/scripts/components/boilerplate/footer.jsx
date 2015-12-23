import React from 'react';
import T from '../misc/t';
import YearSelector from '../map/yearselector.jsx';
import IndicatorSelector from '../map/indicatorselector.jsx';

require('stylesheets/boilerplate/footer');


const Footer = React.createClass({
  render() {
    return (
      <div className="footer">
         <p ><T k="footer.indicator" /><IndicatorSelector /> <T k="footer.years"/><YearSelector /></p>
      </div>
    );
  },
});

export default Footer;
