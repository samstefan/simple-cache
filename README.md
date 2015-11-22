Simple Cache
---
[![Build Status](https://travis-ci.org/samstefan/simple-cache.svg)](https://travis-ci.org/samstefan/simple-cache) [![npm version](https://badge.fury.io/js/simple-memory-cache.svg)](https://badge.fury.io/js/simple-memory-cache)

A simple in-memory cache store with optional expiry and no external dependencies.

### Requirements:

* `node.js` >= `4.0.0`

### Install
```
npm install simple-memory-cache
```

### Options - `set()`
* `name` Required: The name of the cache item
* `data` Required: The data that you want to cache
* `clear` Optional: The amount of time you want to store the data in memory for in milliseconds, the default is forever.

### Examples

#### Basic setting and getting data
```
import Cache from 'simple-memory-cache'
var cache = new Cache()

var errors = cache.set({ name: 'myCache', data: { people: ['Sam', 'Dom'] }})
if (errors.error) {
  console.log(errors.error)
}

var cacheData = cache.get('myCache')
if (cacheData.error) {
  return console.log(cacheData.error)
}

console.log(cacheData.data)
console.log(cacheData.name)
```

#### Setting data with an expiry
```
var errors = cache.set({ name: 'myCache', clear: 10000, data: { people: ['Sam', 'Dom'] }})
```

### License (MIT)
Copyright (c) 2015 Sam Stefan, http://samstefan.co.uk

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
