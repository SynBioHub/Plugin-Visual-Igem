import { Request, Response } from 'express';

function run(req: Request, res: Response) {
    res.send("<b>Whoopee!</b>")
}

export {
    run
};
