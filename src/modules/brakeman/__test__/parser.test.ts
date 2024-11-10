import { join } from 'node:path'
import { BrakemanFileNotExistError, BrakemanValidateError } from '../errors'
import { BrakemanIgnoreValidator } from '../validator'

describe('BrakemanIgnoreParser#parse', () => {
  describe('when brakeman ignore file is valid and includes note property', () => {
    it('does not throw error', () => {
      const path = join(__dirname, 'brakeman.ignore')
      const sut = new BrakemanIgnoreValidator(path)
      expect(() => sut.validate()).not.toThrow()
    })
  })

  describe("when brakeman.ignore file includes a property doesn't include note property", () => {
    it('throws specific error and message', () => {
      const path = join(__dirname, 'noNote_brakeman.ignore.json')
      const sut = new BrakemanIgnoreValidator(path)
      expect(() => sut.validate()).toThrow(BrakemanValidateError)
      expect(() => sut.validate()).toThrow(
        'note property must be at least 5 characters long'
      )
    })
  })

  describe('when brakeman.ignore file does not exist', () => {
    it('throws specific error and message', () => {
      const path = join(__dirname, 'notExist_brakeman.ignore.json')
      const sut = new BrakemanIgnoreValidator(path)
      expect(() => sut.validate()).toThrow(BrakemanFileNotExistError)
    })
  })
})
