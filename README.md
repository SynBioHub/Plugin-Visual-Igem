# plugin-igem

A plugin for rendering iGEM parts.

To run:
  1. Install dependencies with `yarn`
  2. Start with `yarn start`

The configuration is in `data/config.json`. You can ignore `config.local.json`.
There are two configuration options: 
  1. `applicationPort`: the port on which the plugin server listens for requests
  2. `iGEMSuffix`: the suffix appended to the iGEM URL an SBOL part was derived from, used to customize which iGEM page to fetch and return.
