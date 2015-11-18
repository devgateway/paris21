import React from 'react';
import {Link} from 'react-router';
import T from '../misc/t';

require('stylesheets/boilerplate/nav');

const OpenDataNav = React.createClass({
  render() {
    return (
      <ul className="open-data-nav">
        <li>
          <Link activeClassName="active" to="/">
            <T k="nav.home" />
          </Link>
        </li>
      </ul>
    );
  },
});

export default OpenDataNav;
