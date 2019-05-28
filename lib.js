const parse = require('csv-parse/lib/sync')
const fs = require('fs')

function load_data(filename) {
  return parse(fs.readFileSync(filename, 'UTF-8'), {columns: true})
}

function filter_illegal_keys(keys) {
  const permitted_keys = ['id', 'name', 'address1', 'city', 'postcode', 'phone', 'org_type', 'cat_crime', 'cat_debt', 'cat_housing', 'cat_immigration_or_asylum', 'cat_welfare_benefits']
  return keys.filter((e) => {
    return permitted_keys.indexOf(e) !== -1
  })
}

function filter_data(data, sought, queries) {
  // filter the data set by key
  filtered = data
  sought.forEach((key) => {
    filtered = filtered.filter((l) => l[key] === queries[key])
  })
  return filtered
}

module.exports = {
  load_data,
  filter_data,
  filter_illegal_keys
}