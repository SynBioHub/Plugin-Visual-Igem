import express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { Config } from './lib/config';

import { status } from './api/status';
import { run } from './api/run';
import { evaluate } from './api/evaluate';

function app(): express.Express {
    let config = new Config();
    let app = express();

    // API Endpoints
    app.get('/:type/status', status);
    app.post('/:type/run', bodyParser.json(), run);
    app.post('/:type/evaluate', bodyParser.json(), evaluate);

    return app;
}

export {
    app
};
