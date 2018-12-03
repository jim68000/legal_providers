const parse = require('csv-parse/lib/sync')
const fs = require('fs')
const _ = require('lodash')

const legal_providers = parse(fs.readFileSync('./legal-providers.csv', 'UTF-8'), {columns: true})

const express = require('express')
const app = express()

app.get('/providers', (req, res) => {
  if (_.isEmpty(req.query)) {
    res.json(legal_providers)
  } else {
    const sought_keys = Object.keys(req.query)
    filtered = legal_providers
    sought_keys.forEach((key) => {
      filtered = filtered.filter((l) => l[key] === req.query[key])
    })
    if (filtered.length === 0) {
      res.status(404).send('No matching providers')
    }
    res.json(filtered)
  }
})

app.get('/provider/:id?', (req, res) => {
  // deal with off by one diff between file and array representation
  const idx = parseInt(req.params.id, 10) - 1
  res.json(legal_providers[idx])
})

app.listen(3000, () => console.log('app started at 3000'))