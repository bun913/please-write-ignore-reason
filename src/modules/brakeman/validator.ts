import * as fs from 'node:fs'
import * as v from 'valibot'
import { BrakemanIgnoreFileSchema } from './type'
import { BrakemanValidateError, BrakemanFileNotExistError } from './errors'

export class BrakemanIgnoreValidator {
  private filePathList: string[]

  constructor(listFilepath: string) {
    const fileList = listFilepath.trim().split(',')
    this.filePathList = fileList
  }

  public validate(): void {
    for (const filePath of this.filePathList) {
      if (!fs.existsSync(filePath)) {
        throw new BrakemanFileNotExistError(filePath)
      }
      const file = fs.readFileSync(filePath, 'utf-8')
      const json = JSON.parse(file)
      try {
        v.parse(BrakemanIgnoreFileSchema, json)
      } catch (error) {
        if (error instanceof v.ValiError) {
          throw new BrakemanValidateError(error.message, filePath)
        }
      }
    }
  }
}
