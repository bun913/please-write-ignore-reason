import * as core from '@actions/core'
import { BrakemanIgnoreValidator } from './modules/brakeman/validator'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function checkBrakeman(): Promise<void> {
  try {
    const fileListString = core.getInput('fileListString')
    const validator = new BrakemanIgnoreValidator(fileListString)
    validator.validate()
    core.setOutput('result', 'success')
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
