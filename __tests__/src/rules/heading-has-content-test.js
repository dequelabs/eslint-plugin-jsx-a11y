/* eslint-env jest */
/**
 * @fileoverview Enforce heading (h1, h2, etc) elements contain accessible content.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/heading-has-content';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  // message: 'Headings must have content and the content must be accessible by a screen reader.',
  message: 'Element does not have text that is visible to screen readers',
  type: 'JSXOpeningElement',
};

ruleTester.run('heading-has-content', rule, {
  valid: [
    { code: '<div />;' },
    { code: '<h1>Foo</h1>' },
    { code: '<h2>Foo</h2>' },
    { code: '<h3>Foo</h3>' },
    { code: '<h4>Foo</h4>' },
    { code: '<h5>Foo</h5>' },
    { code: '<h6>Foo</h6>' },
    { code: '<h6>123</h6>' },
    { code: '<h1><Bar /></h1>' },
    { code: '<h1>{foo}</h1>' },
    { code: '<h1>{foo.bar}</h1>' },
    { code: '<h1 aria-label="foo"></h1>' },
    { code: '<h1 role="presentation"></h1>' },
    // TODO: Support dangerouslySetInnerHTML
    // { code: '<h1 dangerouslySetInnerHTML={{ __html: "foo" }} />' },
    // TODO Wilco: Figure out if this works
    // { code: '<h1 children={children} />' },
  ].map(parserOptionsMapper),
  invalid: [
    { code: '<h1 />', errors: [expectedError] },
    // TODO: Add aria-hidden check to Axe-core for slotted content
    // { code: '<h1><Bar aria-hidden /></h1>', errors: [expectedError] },
    { code: '<h1>{undefined}</h1>', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
