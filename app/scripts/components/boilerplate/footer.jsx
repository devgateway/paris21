import React from 'react';
import T from '../misc/t';
import YearSelector from '../map/yearselector';
import IndicatorSelector from '../map/indicatorselector';
import Filter from  '../map/filter';

require('stylesheets/boilerplate/footer');


const Footer = React.createClass({
  render() {
    return (
      <div className="footer">
         <p ><T k="footer.indicator" /><IndicatorSelector /> <T k="footer.years"/><YearSelector /> <T k="footer.filter"/><Filter /></p>
      </div>
    );
  },
});

export default Footer;
