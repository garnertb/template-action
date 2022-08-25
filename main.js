
const fs = require('fs').promises;
const handlebars = require('handlebars');
const core = require('@actions/core');
const yaml = require("js-yaml"); 

async function main() {
  const template = core.getInput('TEMPLATE', {required: true, trimWhitespace: true})
  const compiledTemplate = handlebars.compile(template);
  const inputs = getAllInputs();
  
  core.debug('inputs', JSON.stringify(inputs,undefined,2));
  const result = compiledTemplate(inputs)
  core.debug(`compliled results: ${result}`)
  core.setOutput('payload', result)
  return result;
}

function getAllInputs() {
  return Object.entries(process.env).reduce((result, [key, value]) => {
    if (!/^INPUT_/.test(key)) return result;
    const inputName = key.substr("INPUT_".length).toLowerCase();
    result[inputName] = yaml.load(value);

    return result;
  }, {})
};

main()