/* global describe, it, afterEach */
import { expect } from 'chai'
import register, * as ignoreStyles from '../ignore-styles'

describe('ignore-styles', () => {
  afterEach(() => {
    ignoreStyles.oldHandlers = {}
  })

  describe('register()', () => {
    afterEach(() => {
      delete require.extensions['.blargh']
      delete ignoreStyles.oldHandlers['.blargh']
    })

    it('saves the old handler so that it can be restored later', () => {
      register(['.blargh'])
      expect(ignoreStyles.oldHandlers).to.have.property('.blargh', undefined)
    })

    it('allows for a custom function to be provided instead of the no-op', () => {
      const customHandler = () => ({soup: 'No soup for you!'})
      register(['.blargh'], customHandler)
      expect(require.extensions['.blargh']().soup).to.equal('No soup for you!')
    })

    it('provides the old handler to the new handler', () => {
      const oldHandler = () => {}
      require.extensions['.blargh'] = oldHandler

      let receivedOldHandler = null
      const newHandler = (module, filename, oldHandler) => {
        receivedOldHandler = oldHandler
      }
      register(['.blargh'], newHandler)
      require.extensions['.blargh']({}, 'foo')
      expect(receivedOldHandler).to.equal(oldHandler)
    })
  })

  describe('restore', () => {
    afterEach(() => {
      delete require.extensions['.fake']
    })

    it('returns the handlers back to their previous state', () => {
      function fakeHandler () {}
      require.extensions['.fake'] = fakeHandler

      register(['.fake'])

      ignoreStyles.restore()
      expect(require.extensions['.fake']).to.equal(fakeHandler)
    })
  })
})
