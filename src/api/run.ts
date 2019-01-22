import { Request, Response } from 'express'
import { SBOL2Graph, S2Identified } from 'sbolgraph'
import { Config } from '../lib/config'
import * as request from 'request'
const postprocess_igem = require('../lib/postprocess_igem')


let topLevelPredicate: string = "http://wiki.synbiohub.org/wiki/Terms/synbiohub#topLevel"
let wasDerivedFromPredicate: string = "http://www.w3.org/ns/prov#wasDerivedFrom"

async function run(req: Request, res: Response) {
    let config = new Config()
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
    let suffix = config.get('iGEMSuffix') 

    request.get(wasDerivedFrom + suffix, (err: any, resp: any, body: any) => {
        if (err || res.statusCode > 300) {
            return
        }

        res.send(postprocess_igem(body))
    })
}

export {
    run
}
