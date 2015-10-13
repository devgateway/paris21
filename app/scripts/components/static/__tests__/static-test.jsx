/* eslint-env jest */

/**
 * All static component tests have been combined into this file because
 * it's really the same single test run against each.
 */

describe('Static Components', () => {
  let React, Data, SpeakOut, NotFound;
  beforeEach(() => {
    React = require('react/addons');
    NotFound = require.requireActual('../not-found.jsx');
  });

  /**
   * Having the class "main" is important because it's used to absolutely
   * position the content in the full-screen layout.
   */
  it('should have class "main"', () => {
    const notFound = React.addons.TestUtils.renderIntoDocument(<NotFound />);
    expect(React.findDOMNode(notFound).className).toEqual('main');
  });

});
