const dotenv = require('dotenv');
const { join } = require('path');

export default (config, env, helpers) => {
  config.resolve.modules.push(join(process.cwd(), 'src'));

  const environment = dotenv.config().parsed;
  const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];

  Object.entries(environment).forEach(([key, value]) => {
    plugin.definitions[`process.env.${key}`] = JSON.stringify(value);
  });
}
