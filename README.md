# TA Tech Test

This is a very simple implementation of the test requirements in node.js

To install: cd to the folder containing this file and type `npm install`
To run: run `npm run server`. The server runs on port 3000s

The app exposes two endpoints:

## Individual records

`/provider/{id}` - this extracts a single legal provider from the data.

http://localhost:3000/provider/1 should return Moore-Watson

The app simply rejects out of range ids

## Filtered response

`providers?{paramName}={paramValue}` - the filters the entire list of
providers using the keywords supplied as arguements. You can search
using all the column names from the CSV: `id`, `name`, `address1`,
`city`, `postcode`, `phone`, `org_type`, `cat_crime`, `cat_debt`,
`cat_housing`, `cat_immigration_or_asylum`, `cat_welfare_benefits`

Cat values are either 0 or 1; all others must be exact

## Notes on implementation

This is very bare bones and there are a lot of things missing that I
would normally regard as essential. Error messaging is minimal; testing
is crude; I haven't blessed Express with a full set of error handlers.

Note of dependency choice:

CSV is the only NPM CSV library with a synchronous parse and load; all
others are stream based, which would have added a considerable layer of
complexity to the code.

Express is my default HTTP framework. I considered HAPI but felt that
learning a new framework (even if I would only need to know the next bit
after 'Hello, world')  was overkill.

Lodash is just for convenience when dealing with functional type code.