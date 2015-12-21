import React from 'react';
import { connect } from 'reflux';
import { updateIndicator } from '../../actions/indicators';
import Indicators from '../../stores/indicators';
import T from '../misc/t';

const IndicatorSelector = React.createClass({

  mixins: [
    connect(Indicators, 'indicators'),
  ],

  getInitialState() {
    updateIndicator('primary_gir_total');
    return {
      value: 'primary_gir_total',
    };
  },

  change(event) {
    event.preventDefault();
    this.state.value = event.target.value;
    updateIndicator(event.target.value);
  },

  render() {
    return (
            <select className="selectable" id="year" onChange={this.change} value={this.state.value} >
              <option value="secondary_ger_boys"><T k="indicator.secondary.TBPS.total"/></option>
              <option value="secondary_ger_total"><T k="indicator.secondary.TBPS.boys"/></option>
              <option value="secondary_ger_girls"><T k="indicator.secondary.TBPS.girls"/></option>
              <option value="primary_gir_total"><T k="indicator.primary.GIR.total"/></option>
              <option value="primary_gir_boys"><T k="indicator.primary.GIR.boys"/></option>
              <option value="primary_gir_girls"><T k="indicator.primary.GIR.girls"/></option>
              <option value="primary_ger_total"><T k="indicator.primary.GER.total"/></option>
              <option value="primary_ger_boys"><T k="indicator.primary.GER.boys"/></option>
              <option value="primary_ger_girls"><T k="indicator.primary.GER.girls"/></option>
              <option value="presc_tbs_total"><T k="indicator.Preschool.TBPS.total"/></option>
              <option value="presc_tbs_boys"><T k="indicator.Preschool.TBPS.boys"/></option>
              <option value="presc_tbs_girls"><T k="indicator.Preschool.TBPS.girls"/></option>
            </select>
      );
  },
});

export default IndicatorSelector;
