import { Request, Response } from 'express'
import { SBOL2Graph, S2Identified } from 'sbolgraph'
import * as request from 'request'

let topLevelPredicate: string = "http://wiki.synbiohub.org/wiki/Terms/synbiohub#topLevel"
let wasDerivedFromPredicate: string = "http://www.w3.org/ns/prov#wasDerivedFrom"

async function run(req: Request, res: Response) {
    let sbolUrl: string = req.body.complete_sbol
    let topLevelUri: string = req.body.top_level

    let graph: SBOL2Graph = await SBOL2Graph.loadURL(sbolUrl)
    let topLevel = graph.uriToFacade(topLevelUri)

    if (topLevel == undefined) {
        res.send("<b>Plugin error</b>")
        return
    }

    let wasDerivedFrom = topLevel.getProperties(wasDerivedFromPredicate)
        .find(wdf => wdf.object.toString().startsWith("http://parts.igem.org/"))
    
    if (wasDerivedFrom == undefined) {
        res.send("<b>Plugin error</b>")
        return
    }

    wasDerivedFrom = wasDerivedFrom.object.toString()

    request.get(wasDerivedFrom + "?action=render", (err, resp, body) => {
        if (err || res.statusCode > 300) {
            return
        }

        console.log("Sending response")
        res.send(body)
    })
}

export {
    run
}
