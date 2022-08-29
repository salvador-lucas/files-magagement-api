import 'module-alias/register';
import express from 'express';
import { expressLoader } from '~loaders';
const app = express();

expressLoader(app);

export default app;
