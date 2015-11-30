import React from 'react';
import { connect } from 'reflux';
import { updateIndicator } from '../../actions/indicators';
import Indicators from '../../stores/indicators';

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
              <option value="secondary_ger_total">Secondary TBPS Boys</option>
              <option value="secondary_ger_girls">Secondary TBPS Girls</option>
              <option value="secondary_ger_boys">Secondary TBPS Total</option>
              <option value="primary_gir_total">Primary GIR Boys</option>
              <option value="primary_gir_boys">Primary GIR Girls</option>
              <option value="primary_gir_girls">Primary GIR Total</option>
              <option value="primary_ger_boys">Primary GER Boys</option>
              <option value="primary_ger_girls">Primary GER Girls</option>
              <option value="primary_ger_total">Primary GER Total</option>
              <option value="presc_tbps_boys">Preschool TBPS Boys</option>
              <option value="presc_tbps_girls">Preschool TBPS Girls</option>
              <option value="presc_tbps_total">Preschool TBPS Total</option>
            </select>
      );
  },
});

export default IndicatorSelector;
