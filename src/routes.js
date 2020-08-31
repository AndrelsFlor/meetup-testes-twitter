import { Router } from 'express';
import TwitterController from './app/controllers/Twitter';

const routes = new Router();

routes.get('/tweets/:query', TwitterController.getTweets);

export default routes;
