import { Client, GatewayIntentBits, Events } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(process.env.BOT_TOKEN);
