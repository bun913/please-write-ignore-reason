/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../main'
import path from 'node:path'

// Mock the action's main function
const runMock = jest.spyOn(main, 'checkBrakeman')

// Mock the GitHub Actions core library
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>

describe('checkBrakeman', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
  })

  describe('when the valide file list string is given', () => {
    it("sets the output to 'success'", async () => {
      const validPath = path.join(
        __dirname,
        '..',
        'modules',
        'brakeman',
        '__test__',
        'valid.json'
      )
      const validPath2 = path.join(
        __dirname,
        '..',
        'modules',
        'brakeman',
        '__test__',
        'valid2.json'
      )
      getInputMock.mockImplementation(name => {
        switch (name) {
          case 'fileListString':
            return `${validPath},${validPath2}`
          default:
            return ''
        }
      })

      await main.checkBrakeman()
      expect(runMock).toHaveReturned()

      expect(setOutputMock).toHaveBeenNthCalledWith(1, 'result', 'success')
      expect(setFailedMock).not.toHaveBeenCalled()
    })
  })

  describe('when the invalide file list string is given', () => {
    it('sets a failed status', async () => {
      getInputMock.mockImplementation(name => {
        switch (name) {
          case 'fileListString':
            return 'this is not a file path'
          default:
            return ''
        }
      })

      await main.checkBrakeman()
      expect(runMock).toHaveReturned()
      expect(setFailedMock).toHaveBeenCalled()
    })
  })

})
