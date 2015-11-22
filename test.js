import should from 'should';
import Cache from './index'

describe('simple-cache', function() {

  it('Shouldn\'t be able to set cache without name and data', function () {
    let cache = new Cache()

    let returnedData = cache.set()
    returnedData.error.code.should.equal(2)
    returnedData.error.message.should.equal('Missing options object')
  })

  it('Should be able to set cache without a clear option', function () {
    let cache = new Cache()
    let cacheName = 'test'
    let data = { some: 'data' }

    var returnedData = cache.set({ name: cacheName, data: data })
    should.equal(returnedData.error, undefined)
  })

  it('Shouldn\'t be able to set cache without name', function () {
    let cache = new Cache()

    let returnedData = cache.set({ name: undefined, data: {} })
    returnedData.error.code.should.equal(1)
    returnedData.error.message.should.equal('Missing cache name')
  })

  it('Shouldn\'t be able to set cache without any data', function () {
    let cache = new Cache()
    let cacheName = 'test2'

    let returnedData = cache.set({ name: cacheName })
    returnedData.error.code.should.equal(4)
    returnedData.error.message.should.equal('Missing cache data')
  })

  it('Should clear data in cache after set time', function (done) {
    let cache = new Cache()
    let cacheName = 'test'
    let data = { some: 'data' }

    var returnedData = cache.set({ name: cacheName, data: data, clear: 10 })
    should.equal(returnedData.error, undefined)

    let retrievedDataOne = cache.get(cacheName)
    retrievedDataOne.name.should.equal(cacheName)
    retrievedDataOne.data.should.equal(data)
    should.equal(retrievedDataOne.error, undefined)

    setTimeout(function() {
      let retrievedDataTwo = cache.get(cacheName)
      retrievedDataTwo.error.code.should.equal(3)
      retrievedDataTwo.error.message.should.equal('No cache found under that name')
      done()
    }, 10)
  })

  it('Should be able to retrieve set data', function () {
    let cache = new Cache()
    let cacheName = 'test'
    let data = { some: 'data' }

    var returnedData = cache.set({ name: cacheName, data: data })
    should.equal(returnedData.error, undefined)

    let retrievedData = cache.get(cacheName)
    retrievedData.name.should.equal(cacheName)
    retrievedData.data.should.equal(data)
    should.equal(retrievedData.error, undefined)
  })

  it('Should be able to set multiple set of data in the same cache', function () {
    let cache = new Cache()
    let returnedDataOne = cache.set({ name: 'test1', data: ['cakes', 'cheese'] })
    let returnedDataTwo = cache.set({ name: 'test2', data: ['bread', 'butter'] })

    should.equal(returnedDataOne.error, undefined)
    should.equal(returnedDataTwo.error, undefined)

    let retrievedDataOne = cache.get('test1')
    should.equal(retrievedDataOne.error, undefined)
    retrievedDataOne.data[0].should.equal('cakes')
    retrievedDataOne.data[1].should.equal('cheese')


    let retrievedDataTwo = cache.get('test2')
    should.equal(retrievedDataTwo.error, undefined)
    retrievedDataTwo.data[0].should.equal('bread')
    retrievedDataTwo.data[1].should.equal('butter')
  })

  it('Should be able to set Arrays and Objects as the data', function () {
    let cache = new Cache()
    let returnedDataOne = cache.set({ name: 'test1', data: { some: 'test data' } })
    let returnedDataTwo = cache.set({ name: 'test2', data: ['bread', 'butter'] })

    should.equal(returnedDataOne.error, undefined)
    should.equal(returnedDataTwo.error, undefined)
  })

  it('Should be able to have septate cache in the same scope', function () {
    let cacheOne = new Cache()
    let cacheTwo = new Cache()
    let returnedDataOne = cacheOne.set({ name: 'test', data: ['Sam', 'Dom'] })
    let returnedDataTwo = cacheTwo.set({ name: 'test', data: ['Mark', 'Andrew'] })

    should.equal(returnedDataOne.error, undefined)
    should.equal(returnedDataTwo.error, undefined)

    let retrievedDataOne = cacheOne.get('test')
    should.equal(retrievedDataOne.error, undefined)
    retrievedDataOne.data[0].should.equal('Sam')
    retrievedDataOne.data[1].should.equal('Dom')

    let retrievedDataTwo = cacheTwo.get('test')
    should.equal(retrievedDataTwo.error, undefined)
    retrievedDataTwo.data[0].should.equal('Mark')
    retrievedDataTwo.data[1].should.equal('Andrew')
  })

})
