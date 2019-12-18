import { Request, Response } from 'express'

async function evaluate(req: Request, res: Response) {
    let objType = req.body.type

    if (objType.toLowerCase() == "componentdefinition") {
      // Send a 200 
      res.send("Acceptable!") 
    } else {
      res.status(400).send("Can't deal with that.")
    }
}

export {
   evaluate 
}
