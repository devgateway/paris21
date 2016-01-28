import React from 'react';
import T from '../misc/t';
import YearSelector from '../map/yearselector';
import IndicatorSelector from '../map/indicatorselector';
import StructuresSelector from '../map/structures-selector';

import Filter from  '../map/filter';

require('stylesheets/boilerplate/footer');


const Footer = React.createClass({
  render() {
    return (
      <div className="footer">
         <p ><T k="footer.indicator" />&nbsp;<IndicatorSelector /> &nbsp;<T k="footer.years"/><YearSelector /> &nbsp;<T k="footer.filter"/>&nbsp;<Filter />&nbsp; <T k="footer.showstructures"/>&nbsp;<StructuresSelector/></p>
      </div>
    );
  },
});

export default Footer;
