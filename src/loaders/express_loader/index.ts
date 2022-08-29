import cors from 'cors';
import bodyParser from 'body-parser';
import { Application } from 'express';

import { routeNotFound } from '~api/middlewares/route_not_found';
import routes from '~api';
import config from '~config';
import { errorHandlerMiddleware } from '~api/middlewares/error_handler';
import helmet from 'helmet';

const { bodySizeLimit, parameterLimit } = config.api;

const bodyParserJsonConfig: bodyParser.OptionsJson = {
  limit: bodySizeLimit
};

const bodyParserUrlencodedConfig: bodyParser.OptionsUrlencoded = {
  extended: true,
  parameterLimit
};

export function expressLoader(app: Application): void {
  /**
   * Enable Cross Origin Resource Sharing to all origins by default
   * More info: https://www.npmjs.com/package/cors
   */
  app.use(cors());

  /**
   * Enable helmet
   * It helps to secure your Express apps by setting various HTTP headers
   */
  app.use(helmet());

  /**
   * Middleware that transforms the raw string of req.body into json
   * Client must send "Content-Type: application/json" header
   * More info: https://www.npmjs.com/package/body-parser
   */
  app.use(bodyParser.json(bodyParserJsonConfig));
  app.use(bodyParser.urlencoded(bodyParserUrlencodedConfig));
  /**
   * Disable Etag header
   */
  app.disable('etag');
  /**
   * Enable trust proxy for identify correctly the IP of the client
   * More info: https://expressjs.com/en/guide/behind-proxies.html
   */
  app.enable('trust proxy');

  /**
   * Load API routes and add prefix to them
   */
  app.use(config.api.prefix, routes());
  /**
   *  Middleware to handle not-found's errors.
   */
  app.use(routeNotFound);
  /**
   * Middleware to handle API's errors
   */
  app.use(errorHandlerMiddleware);
}
