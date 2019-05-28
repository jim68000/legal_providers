# TA Tech Test

This is a very simple implementation of the test requirements in node.js

To install: cd to the folder containing this file and type `npm install`
To run: run `npm run server`. The server runs on port 3000s

The app exposes two endpoints:

## Individual records

`/v1/provider/{id}` - this extracts a single legal provider from the data.

http://localhost:3000/v1/provider/1 should return Moore-Watson

The app simply rejects out of range ids.

## Filtered response

`providers?{paramName}={paramValue}` - the filters the entire list of
providers using the keywords supplied as arguments. You can search
using all the column names from the CSV: `id`, `name`, `address1`,
`city`, `postcode`, `phone`, `org_type`, `cat_crime`, `cat_debt`,
`cat_housing`, `cat_immigration_or_asylum`, `cat_welfare_benefits`

Cat values are either 0 or 1; all others must be exact

## Notes on implementation

This is very bare bones and there are a lot of things missing that I
would normally regard as essential. Error messaging is minimal and testing
is crude.

Normally for this sort of API we would expect data to be stored in some
sort of storage mechanism, either a KV store like Redis or a full
database like Postgres. However as the data is very small and static
I've chosen to load it into memory at start up instead. This keeps
the implementation small.

### Notes on dependency choices:

CSV is the only NPM CSV library with a synchronous parse and load; all
others are stream based, which would have added a considerable layer of
complexity to the code.

Express is my default HTTP framework. I considered HAPI but felt that
learning a new framework (even if I would only need to know the next bit
after 'Hello, world')  was overkill.

