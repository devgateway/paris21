import isUndefined from 'lodash/lang/isUndefined';
import isFunction from 'lodash/lang/isFunction';
import isArray from 'lodash/lang/isArray';
import React from 'react';
import warn from '../../utils/warn';
import { connect } from 'reflux';
import langStore from '../../stores/lang';


const allTranslations = {
  'en': {
    'site-name': 'Paris21 Dashboard',
    'site.flag': 'Paris21',
    'nav.home': 'Home',
    'nav.data': 'Data',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'footer.years': 'Select Year',
    'footer.indicator': 'Select an Indicator',
    'indicator.primary.GIR.total': 'Primary GIR Total',
    'indicator.primary.GIR.boys': 'Primary GIR Boys',
    'indicator.primary.GIR.girls': 'Primary GIR Girls',
    'indicator.primary.GER.total': 'Primary GER Total',
    'indicator.primary.GER.boys': 'Primary GER Boys',
    'indicator.primary.GER.girls': 'Primary GER girls',
    'indicator.secondary.GER.total': 'Secondary TBS Total',
    'indicator.secondary.GER.boys': 'Secondary TBS Boys',
    'indicator.secondary.GER.girls': 'Secondary TBS Girls',
    'indicator.Preschool.TBPS.total': 'Preschool TBPS Total',
    'indicator.Preschool.TBPS.boys': 'Preschool TBPS Boys',
    'indicator.Preschool.TBPS.girls': 'Preschool TBPS Girls',
    'indicator.secondary.TBPS.total': 'Secondary TBPS Total',
    'indicator.secondary.TBPS.boys': 'Secondary TBPS Boys',
    'indicator.secondary.TBPS.girls': 'Secondary TBPS Girls',
    'legend.title': 'Legend',
  },

  'fr': {
    'site-name': 'Tableau de bord Paris21',
    'site.flag': 'Paris21',
    'nav.home': 'Accueil',
    'nav.data': 'Données',
    'lang.en': 'Anglais',
    'lang.fr': 'Français',
    'footer.years': 'Choisir une année',
    'footer.indicator': 'Choisir un indicateur',
    'indicator.primary.GIR.total': 'TBA en CI Total',
    'indicator.primary.GIR.boys': 'TBA en CI Garçons',
    'indicator.primary.GIR.girls': 'TBA en CI Filles',
    'indicator.primary.GER.total': 'TBS Primaire Total',
    'indicator.primary.GER.boys': 'TBS Primaire Garçons',
    'indicator.primary.GER.girls': 'TBS Primaire Filles',
    'indicator.secondary.GER.total': 'TBS Secondaire Total',
    'indicator.secondary.GER.boys': 'TBS Secondaire Garçons',
    'indicator.secondary.GER.girls': 'TBS Secondaire Filles',
    'indicator.Preschool.TBPS.total': 'TBPS Total',
    'indicator.Preschool.TBPS.boys': 'TBPS Garçons',
    'indicator.Preschool.TBPS.girls': 'TBPS Filles',
    'indicator.secondary.TBPS.total': 'Secondaire TBPS Total',
    'indicator.secondary.TBPS.boys': 'Secondaire TBPS Boys',
    'indicator.secondary.TBPS.girls': 'Secondaire TBPS Girls',
    'legend.title': 'Légende',
  },
};


/**
 * @param {string} lang The language to translate to like 'en'
 * @param {string} k The key for the translation, like 'site.name'
 * @param {array<any>} i Any values to interpolate into the string
 * @returns {string} the translated string, or the key if it's missing
 */
function translate(lang, k, i) {
  const langTranslations = allTranslations[lang];
  if (isUndefined(langTranslations)) {
    // if the language key is bad, quit early
    warn(`missing language ${lang} to translate ${k}`);
    return k;
  }
  let translated = langTranslations[k];
  if (isUndefined(translated)) {
    warn(`missing translation for key: ${k}`);
    translated = k;
  } else if (isFunction(translated)) {
    if (!isArray(i)) {
      warn(`missing expected array for interpolating ${k}, got: ${i}`);
      translated = translated([]);
    } else {
      translated = translated(i);
    }
  }
  return translated;
}


const T = React.createClass({
  propTypes: {
    i: React.PropTypes.array,
    k: React.PropTypes.string.isRequired,
  },
  mixins: [
    connect(langStore, 'lang'),
  ],
  render() {
    const translated = translate(this.state.lang, this.props.k, this.props.i);
    return (
      <span className="t">{translated}</span>
    );
  },
});

export { translate };
export default T;
