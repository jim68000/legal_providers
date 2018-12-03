const parse = require('csv-parse/lib/sync')
const fs = require('fs')

const legal_providers = parse(fs.readFileSync('./legal-providers.csv', 'UTF-8'), {columns: true})
// ids start at 1, so we insert an empty element to align ids and index
legal_providers.unshift(null)

