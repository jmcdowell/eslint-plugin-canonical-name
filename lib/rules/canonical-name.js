/**
 * @fileoverview canonical-name
 * @author Justin McDowell
 * @copyright 2016 Justin McDowell. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = function (context) {
  // variables should be defined here

  //--------------------------------------------------------------------------
  // Helpers
  //--------------------------------------------------------------------------

  // any helper functions should go here or else delete this section

  //--------------------------------------------------------------------------
  // Public
  //--------------------------------------------------------------------------

  return {

    Identifier: function (node) {
      var items = context.options[0];
      var error;

      items.forEach(function (item) {
        var matches = item.matches;

        matches.forEach(function (match) {
          var matchRegex = new RegExp('.*' + match + '.*');
          var canonicalRegex = new RegExp('.*' + item.canonical + '.*');
          var suggestion;

          if (matchRegex.test(node.name) && !canonicalRegex.test(node.name)) {
            suggestion = node.name.replace(match, item.canonical);
            error = 'Found "' + node.name + '", suggest "' + suggestion + '"';

            context.report(node, error, {
              identifier: node.name
            });
          }
        });
      });
    }

  };
};

module.exports.schema = [
  {
    type: 'array',
    description: 'A canonical name match definition',
    items: {
      type: 'object',
      properties: {
        canonical: {
          type: 'string',
          description: 'The accepted name'
        },
        matches: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      required: ['canonical', 'matches']
    }
  }
];
