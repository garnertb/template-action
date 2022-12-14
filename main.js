
const handlebars = require('handlebars');
const core = require('@actions/core');
const yaml = require("js-yaml"); 

handlebars.registerHelper('withinAWeek', function(arg1, opts) {
  return (Date.now() - Date.parse(arg1) < 86400000 * 7) ? opts.fn(this) : opts.inverse(this);
});

async function main() {
  const template = core.getInput('TEMPLATE', {required: true, trimWhitespace: true})
  const compiledTemplate = handlebars.compile(template);
  const inputs = getAllInputs();
  
  core.debug('inputs', JSON.stringify(inputs,undefined,2));
  const result = compiledTemplate(inputs)
  core.debug(`compiled results: ${result}`)
  core.setOutput('payload', result)
  return result;
}

function getAllInputs() {
  return Object.entries(process.env).reduce((result, [key, value]) => {
    if (!/^INPUT_/.test(key)) return result;
    const inputName = key.substr("INPUT_".length).toLowerCase();
    
    core.debug(`reading input key: ${key}, value: ${value}`);
    
    if (key !== 'INPUT_TEMPLATE') {
      result[inputName] = yaml.load(value);
    }
    return result;
  }, {})
};

main()