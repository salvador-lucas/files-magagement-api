import mongoose from 'mongoose';
import Mongoose from 'mongoose';
import config from '~config';
import { ENVIRONMENTS } from '~constants';

let database: Mongoose.Connection;

export const connect = (): void => {
  // add your own uri below
  let uri: string;

  if (config.environment === ENVIRONMENTS.LOCAL) {
    uri = `mongodb://localhost:27017/${config.database.connection.database}?retryWrites=true&w=majority`;
  } else
    uri = `mongodb+srv://${config.database.connection.user}:${config.database.connection.password}@${config.database.connection.host}/${config.database.connection.database}?retryWrites=true&w=majority`;

  if (database) {
    return;
  }

  mongoose.pluralize(null);
  Mongoose.connect(uri);

  database = Mongoose.connection;
  database.once('open', async () => {
    console.log('Connected to database');
  });
  database.on('error', () => {
    console.log('Error connecting to database');
  });
};

export const disconnect = (): void => {
  if (!database) {
    return;
  }
  Mongoose.disconnect();
};
