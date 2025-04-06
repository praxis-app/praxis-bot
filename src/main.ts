import bodyParser from 'body-parser';
import cors from 'cors';
import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import helmet, { contentSecurityPolicy } from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { appRouter } from './app.router';
import { dataSource } from './database/data-source';
import { DiscordClient } from './shared/shared.types';

dotenv.config();

const initDiscordClient = () => {
  const discordClient = new Client({
    intents: [GatewayIntentBits.Guilds],
  }) as DiscordClient;

  discordClient.commands = new Collection();

  const foldersPath = path.join(__dirname, 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath);

      if ('data' in command && 'execute' in command) {
        discordClient.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
        );
      }
    }
  }

  discordClient.once(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag} 🤖`);
  });
  discordClient.login(process.env.BOT_TOKEN);
};

const initExpressServer = async () => {
  const app = express();
  const port = process.env.PORT;

  await dataSource.initialize();

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: contentSecurityPolicy.getDefaultDirectives(),
      },
      crossOriginEmbedderPolicy: true,
    }),
  );

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json({ limit: '5mb' }));
  app.use(morgan('dev'));
  app.use(cors());

  app.use('/', appRouter);

  app.listen(port, () => {
    const url = `http://localhost:${process.env.PORT}`;
    console.log(`Server running at ${url} 🚀`);
  });
};

(async () => {
  await initExpressServer();
  initDiscordClient();
})();
