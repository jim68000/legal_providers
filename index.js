const express = require('express')

const {
  load_data,
  filter_data,
  filter_illegal_keys
} = require('./lib.js')

const app = express()

const version = '/v1'

const legal_providers = load_data('./legal-providers.csv')

app.get(`${version}/providers`, (req, res) => {
  if (Object.keys(req.query).length === 0 && req.query.constructor === Object) {
    res.json(legal_providers)
  } else {
    const all_keys = Object.keys(req.query)

    // filter out illegal keys
    const sought_keys =filter_illegal_keys(all_keys)
    const filtered = filter_data(legal_providers, sought_keys, req.query)

    if (filtered.length === 0) {
      res.status(404).send('No matching providers')
    }

    res.json(filtered)
  }
})

app.get(`${version}/provider/:id?`, (req, res) => {
  // deal with off by one diff between file and array representation
  const idx = parseInt(req.params.id, 10) - 1
  res.json(legal_providers[idx])
})

app.listen(3000, () => console.log('app started at 3000'))

