export class BrakemanValidateError extends Error {
  constructor(message: string, filePath: string) {
    super(`ValideError in ${filePath}: ${message}`)
    this.name = 'BrakemanValidateError'
  }
}

export class BrakemanFileNotExistError extends Error {
  constructor(filePath: string) {
    super(`File does not exist: ${filePath}`)
    this.name = 'BrakemanFileNotExistError'
  }
}
