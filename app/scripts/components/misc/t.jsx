import isUndefined from 'lodash/lang/isUndefined';
import isFunction from 'lodash/lang/isFunction';
import isArray from 'lodash/lang/isArray';
import React from 'react';
import warn from '../../utils/warn';
import { connect } from 'reflux';
import langStore from '../../stores/lang';


const allTranslations = {
  'en': {
    'site-name': 'Senegal Dashboard',
    'site.flag': 'Senegal',
    'nav.home': 'Home',
    'nav.data': 'Data',
    'lang.en': 'English',
    'lang.fr': 'Français',
    'footer.years': 'Select Year',
    'footer.indicator': 'Select an Indicator',
    'footer.filter': 'Filter',
    'footer.showstructures': 'Show Structures',

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

    'legend.title': 'Legend',

    'popup.header': 'Project Information',
    'popup.title': 'Title',
    'popup.donors': 'Donors',
    'popup.sector': 'Sector',
    'popup.description': 'Description',
    'popup.startdate': 'Start Date',
    'popup.enddate': 'End Date',
    'popup.totalcommitments': 'Total Commitments',
    'popup.totaldisbursements': 'Total Disbursements',
    'map.reset': 'Reset zoom',
  },

  'fr': {
    'site-name': 'Tableau de bord du Sénégal',
    'site.flag': 'Paris21',
    'nav.home': 'Accueil',
    'nav.data': 'Données',
    'lang.en': 'Anglais',
    'lang.fr': 'Français',
    'footer.years': 'Choisir une année',
    'footer.indicator': 'Choisir un indicateur',
    'footer.filter': 'Filtre',
    'footer.showstructures': 'Voir Les structures',

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
    'legend.title': 'Légende',

    'popup.header': 'Informations sur le projet',
    'popup.title': 'Titre',
    'popup.sector': 'Sector',
    'popup.description': 'Description',
    'popup.donors': 'Donors',
    'popup.startdate': 'End Date',
    'popup.enddate': 'Start Date',
    'popup.totalcommitments': 'Total Des Engagements',
    'popup.totaldisbursements': 'Total Des Décaissements',
    'map.reset': 'Réinitialiser zoom',
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
