import bodyParser from 'body-parser';
import cors from 'cors';
import { Client, Events, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { appRouter } from './app.router';
import { dataSource } from './database/data-source';

dotenv.config();

(async () => {
  // -------------------------------------------------------------------------
  // Express server
  // -------------------------------------------------------------------------

  const app = express();
  const port = process.env.PORT;

  await dataSource.initialize();

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: helmet.contentSecurityPolicy.getDefaultDirectives(),
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

  // -------------------------------------------------------------------------
  // Discord client
  // -------------------------------------------------------------------------

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once(Events.ClientReady, (readyClient) => {
    console.log(`Logged in as ${readyClient.user.tag} 🤖`);
  });

  client.login(process.env.BOT_TOKEN);
})();
