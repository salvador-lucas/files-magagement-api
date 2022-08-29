// import config from './config';
import config from './config';
import app from './app';
import { connect } from './config/DBconfig';

const PORT = config.api.port;

connect();

(function startServer(): void {
  try {
    app.listen(PORT);
    console.info(`Server listening on port ${PORT} 🙂`);
  } catch (error) {
    console.error(error);
  }
})();
