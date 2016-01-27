import React from 'react';
import { connect } from 'reflux';
import { updateIndicator } from '../../actions/indicators';
import Indicators from '../../stores/indicators';
import TChildProps from '../misc/t-set-child-props';
import IndicatorsList from '../../stores/indicatorslist';
import { loadData } from '../../actions/indicatorslist';

const IndicatorSelector = React.createClass({

  mixins: [
    connect(Indicators, 'indicators'),
    connect(IndicatorsList, 'indicatorslist'),
  ],

  getInitialState() {
    updateIndicator('primary_gir_total');
    return {
      value: 'primary_gir_total',
    };
  },
  componentWillMount() {
    loadData();
  },
  change(event) {
    event.preventDefault();
    this.state.value = event.target.value;
    updateIndicator(event.target.value);
  },

  render() {
    return (
            <select className="selectable" id="year" onChange={this.change} value={this.state.value} >
                {
                  this.state.indicatorslist.map(function(indicator) {
                    return <option value={indicator.value}>{indicator.nametoshow}</option>;
                  })
                }
            </select>
      );
  },
});

export default IndicatorSelector;
