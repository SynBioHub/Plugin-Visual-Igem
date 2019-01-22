import express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Config } from './lib/config';

import { status } from './api/status';
import { run } from './api/run';

function app(): express.Express {
    let config = new Config();
    let app = express();

    // API Endpoints
    app.get('/status', status);
    app.post('/run', bodyParser.json(), run);

    return app;
}

export {
    app
};
