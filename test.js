assert = require('assert')

const {
  load_data,
    filter_data,
    filter_illegal_keys
} = require('./lib.js')

const providers = load_data('./legal-providers.csv')
assert.equal(providers.length, 100, 'Incorrect number of rows ' + providers.length)
assert.ok(Array.isArray(providers))
assert.equal(providers[1].id, 2)

const illegals = filter_illegal_keys(['banana', 'gumdrop'])
assert.deepEqual(illegals, [])

const semi_illegals = filter_illegal_keys(['name', 'cupcake'])
assert.deepEqual(semi_illegals, ['name'])

const legals = filter_illegal_keys(['id', 'name', 'address1', 'city'])
assert.deepEqual(legals, ['id', 'name', 'address1', 'city'])

const some_providers = filter_data(providers, ['cat_debt'], {cat_debt: "1"})
assert.equal(some_providers.length, 45)
