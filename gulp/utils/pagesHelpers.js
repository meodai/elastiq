const _ = require('lodash');
const markdown = require('marked');
const pugInline = require('jade-inline-file');
const v4 = require('uuid/v4');

module.exports = (config, mergedDefinitions) => {
  // TODO: Rewrite and document this helper function

  /**
   * Helper doesn't validates if a user specifies a value
   */
  function hasValue(value) {
    return value !== null && value !== undefined;
  }

  /**
   * Merges a simple component option with its default
   *
   * *optionValue* the value of the option, as called by the user.
   *
   * *optionSchema* the schema of the option, as defined in definition.yml
   * (e.g. ['foo', 'bar'])
   *
   * If the user doesn't pass any value, take the default from the schema
   */
  function mergeSimpleOptionDefault(optionValue, optionSchema) {
    // if the passed options has any value for this option
    // just take that value
    if (hasValue(optionValue)) {
      return optionValue;
    }
    // otherwise take the default value (first value)
    return optionSchema[0];
  }

  /**
   * Merges a complex component option with its default
   *
   * *optionValue* the value of the complex option, has called by the user
   * (e.g. { all: 'foo', mobile: 'bar' })
   *
   * *optionSchema* the schema of the complex option, has defined in definition.yml
   * (e.g. { all: ['bar', 'foo'], mobile: ['foo', 'bar'] } )
   *
   * This function, for all suboptions, takes the default value if the user
   * doesn't specify any value
   */
  function mergeComplexOptionDefault(optionValue, optionSchema) {
    const transformedOption = {};

    // For each sub-option of the schema
    _.forEach(optionSchema, (subO, subOKey) => {
      const subOptionValue = mergeSimpleOptionDefault(optionValue[subOKey], subO);
      let realSubOKey;

      // process the suboption transformed key
      if (subOKey === 'all') {
        realSubOKey = '';
      } else {
        realSubOKey = `-${subOKey}`;
      }

      transformedOption[realSubOKey] = subOptionValue;
    });
    return transformedOption;
  }

  // In short, it transforms this object:
  // options:
  //   size:
  //     all: 'value1'
  //     mobile: 'value2'
  //   ratio:
  //     all: value3
  //   border: true

  // Into this one:

  // options:
  //   size:
  //     '': 'value1'
  //     '-mobile': 'value2'
  //   ratio:
  //     '': value3
  //   border: true
  const mergeDefaultOptions = (options = {}, path) => {
    const schema = mergedDefinitions[path];
    const optionsSchema = schema.options;

    return _.mapValues(optionsSchema, (o, oKey) => {
      // Handle simple option (options that are just an array)
      if (Array.isArray(o)) {
        return mergeSimpleOptionDefault(options[oKey], o);
      }

      return mergeComplexOptionDefault(options[oKey] || {}, o);
    });
  };

  return {
    mergeDefaultOptions,
    markdown,
    inline: pugInline,
    v4
  };
};
