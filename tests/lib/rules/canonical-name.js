/**
 * @fileoverview canonical-name
 * @author Justin McDowell
 * @copyright 2016 Justin McDowell. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/canonical-name');
var RuleTester = require('eslint').RuleTester;

var options;
var ruleTester;

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

function formatMessage(match, suggestion) {
  return 'Found "' + match + '", suggest "' + suggestion + '"';
}

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

options = [
  [
    {
      canonical: 'xyz',
      matches: [
        'yzx',
        'yxz',
        'zyx'
      ]
    }
  ]
];

ruleTester = new RuleTester();
ruleTester.run('canonical-name', rule, {
  valid: [
    // Identifier
    {
      code: 'xyz',
      options: options
    },
    {
      code: 'prefixxyz',
      options: options
    },
    {
      code: 'xyzsuffix',
      options: options
    },
    {
      code: 'prefixxyzsuffix',
      options: options
    },
    {
      code: 'var xyz = 100;',
      options: options
    },
    {
      code: 'Zyx',
      options: options
    },
    {
      code: 'function xyz() { var xyz = 100; }',
      options: options
    }
  ],
  invalid: [
    // Identifier
    {
      code: 'zyx',
      options: options,
      errors: [{
        message: formatMessage('zyx', 'xyz'),
        type: 'Identifier'
      }]
    },
    {
      code: 'prefixzyx',
      options: options,
      errors: [{
        message: formatMessage('prefixzyx', 'prefixxyz'),
        type: 'Identifier'
      }]
    },
    {
      code: 'zyxsuffix',
      options: options,
      errors: [{
        message: formatMessage('zyxsuffix', 'xyzsuffix'),
        type: 'Identifier'
      }]
    },
    {
      code: 'prefixzyxsuffix',
      options: options,
      errors: [{
        message: formatMessage('prefixzyxsuffix', 'prefixxyzsuffix'),
        type: 'Identifier'
      }]
    },
    {
      code: 'var zyx = 100;',
      options: options,
      errors: [{
        message: formatMessage('zyx', 'xyz'),
        type: 'Identifier'
      }]
    },
    {
      code: 'function yxz() { var zyx = 100; }',
      options: options,
      errors: [{
        message: formatMessage('yxz', 'xyz'),
        type: 'Identifier'
      }, {
        message: formatMessage('zyx', 'xyz'),
        type: 'Identifier'
      }]
    }
  ]
});
