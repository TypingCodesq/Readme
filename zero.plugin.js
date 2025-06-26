const { Plugin, Button, Modal, TextInput } = require('discord.js');

class BypassPlugin extends Plugin {
  constructor() {
    super();
    this.name = 'ZeroBypass';
    this.version = '1.0.0';
    this.description = '..';
  }

  start() {
    this.addButton();
  }

  addButton() {
    const bypassButton = new Button()
      .setCustomId('bypass_button')
      .setLabel('Bypass')
      .setStyle('PRIMARY');

    this.app.workspace.on('chat', (chat) => {
      chat.addComponent(bypassButton);
    });

    this.app.actionManager.on('click_button', async (button) => {
      if (button.customId === 'bypass_button') {
        this.showBypassModal();
      }
    });
  }

  async showBypassModal() {
    const modal = new Modal()
      .setCustomId('bypass_modal')
      .setTitle('URL Bypass')
      .addComponents(
        new TextInput()
          .setCustomId('url_input')
          .setLabel('Enter URL to Bypass')
          .setStyle('SHORT')
          .setRequired(true)
      );

    const interaction = await this.app.interactionManager.showModal(modal);
    const url = interaction.fields.getTextInputValue('url_input');

    if (url) {
      this.bypassURL(url);
    }
  }

  async bypassURL(url) {
    try {
      const response = await fetch(`https://zero-api.usk.lol/api/bypassw?url=${encodeURIComponent(url)}`);
      const data = await response.json();
      const bypassedUrl = data.content;
      this.app.chat.sendMessage(`Bypass result: ${bypassedUrl || 'No result'}`);
    } catch (error) {
      this.app.chat.sendMessage('Error during bypass: Invalid URL or API issue');
    }
  }
}

module.exports = BypassPlugin;
