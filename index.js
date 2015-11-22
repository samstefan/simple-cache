const errors =
  { missingName:
    { code: 1
    , message: 'Missing cache name'
    }
  , missingOptions:
    { code: 2
    , message: 'Missing options object'
    }
  , missingCache:
    { code: 3
    , message: 'No cache found under that name'
    }
  , missingData:
    { code: 4
    , message: 'Missing cache data'
    }
  }

/**
 * Returns an object with two methods for setting and getting cache in the store
 * @return: {Object} the public methods to setting/getting cache
 */

export default function simpleCache() {
  // The cache store
  var cache = {}

  /**
   * Sets data into the cache
   * @param:  {Object} the options object
   * @return: {Object} Contains any errors form the set method
   */

  function set(options) {
    options = setDefaultSetOptions(options)

    // Return any validation error set by `setDefaultSetOptions`
    if (options.error) {
      return { error: options.error }
    }

    // Set the data in the cache
    cache[options.name] = options.data

    // Set up the clear cache timer
    if (options.clear > 0) {
      setTimeout(function() {
        clearCache(options.name)
      }, options.clear)
    }

    return {}
  }

  /**
   * Retrieves data from the cache
   * @param:  {String} the name of the cache you want to retrieve
   * @return: {Object} the cached data and name or any errors
   */

  function get(cacheName) {
    if (cache[cacheName]) {
      return { name: cacheName, data: cache[cacheName] }
    } else {
      return { error: errors.missingCache }
    }
  }

  /**
   * Removes the cache from the store
   * @param: {String} the name of the cache to remove
   */

  function clearCache(cacheName) {
    if (cache[cacheName]) {
      delete cache[cacheName]
    }
  }

  return {
    set: set
  , get: get
  }
}

/**
 * Normalizes the options object with default values and returns any validation errors
 * @param:  {Object} the set cache options
 * @return: {Object} the normalized cache options with the default values
 */

function setDefaultSetOptions(optionsArgs) {
  var defaultVaules = { clear: 0 }

  if (!optionsArgs) {
    return { error: errors.missingOptions }
  }

  if (!optionsArgs.name) {
    return { error: errors.missingName }
  }

  if (!optionsArgs.data) {
    return { error: errors.missingData }
  }

  return {
    clear: optionsArgs.clear || defaultVaules.clear
  , name: optionsArgs.name
  , data: optionsArgs.data
  }

}
