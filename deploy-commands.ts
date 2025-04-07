import { REST, Routes } from 'discord.js';
import fs from 'node:fs';
import path from 'node:path';
import * as dotenv from 'dotenv';

dotenv.config();

const commands: Record<string, any>[] = [];

// Get all command folders from the commands directory
const foldersPath = path.join(__dirname, 'src/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Get all command files from the command folder
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js') || file.endsWith('.ts'));

  // Get SlashCommandBuilder#toJSON() output of each commands data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
      );
    }
  }
}

// Prepare instance of the REST module
const botToken = process.env.BOT_TOKEN as string;
const rest = new REST().setToken(botToken);

// Deploy commands
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    const data = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID as string),
      { body: commands },
    );

    console.log(
      `Successfully reloaded ${(data as any).length} application (/) commands.`,
    );
  } catch (error) {
    console.error(error);
  }
})();
