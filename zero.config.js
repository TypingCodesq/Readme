module.exports = {
  name: 'zeroBypass',
  version: '1.1.0',
  description: 'A plugin for bypassing URLs using Zero API',
  author: '?',
  dependencies: {
    'discord.js': '^14.0.0',
  },
  permissions: ['SEND_MESSAGES', 'USE_APPLICATION_COMMANDS'],
  main: 'zero.plugin.js',
  commands: [],
  events: ['chat', 'click_button'],
};
