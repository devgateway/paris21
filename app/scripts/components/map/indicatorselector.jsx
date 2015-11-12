import React from 'react';
import { updateIndicator } from '../../actions/indicators';

const IndicatorSelector = React.createClass({

  getInitialState() {
    return {
      value: 'primary_gir_total',
    };
  },

  change(event) {
    this.state.value = event.target.value;
    updateIndicator(event.target.value);
  },

  render() {
    return (
            <select className="selectable" id="year" onChange={this.change} value={this.state.value} >
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
