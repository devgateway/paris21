import React from 'react';
import { connect } from 'reflux';
import { updateIndicator } from '../../actions/indicators';
import Indicators from '../../stores/indicators';
import TChildProps from '../misc/t-set-child-props';

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
              <TChildProps>
                <option value="presc_tbps_total">{{k: 'indicator.Preschool.TBPS.total'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="presc_tbps_boys">{{k: 'indicator.Preschool.TBPS.boys'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="presc_tbps_girls">{{k: 'indicator.Preschool.TBPS.girls'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="primary_gir_total">{{k: 'indicator.primary.GIR.total'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="primary_gir_boys">{{k: 'indicator.primary.GIR.boys'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="primary_gir_girls">{{k: 'indicator.primary.GIR.girls'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="primary_ger_total">{{k: 'indicator.primary.GER.total'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="primary_ger_boys">{{k: 'indicator.primary.GER.boys'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="primary_ger_girls">{{k: 'indicator.primary.GER.girls'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="secondary_ger_total">{{k: 'indicator.secondary.GER.total'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="secondary_ger_boys">{{k: 'indicator.secondary.GER.boys'}}</option>
              </TChildProps>
              <TChildProps>
                <option value="secondary_ger_girls">{{k: 'indicator.secondary.GER.girls'}}</option>
              </TChildProps>
            </select>
      );
  },
});

export default IndicatorSelector;
