import { Request, Response } from 'express';

function status(req: Request, res: Response) {
    res.send("<b>Whoopee!</b>")
}

export {
   status 
};
