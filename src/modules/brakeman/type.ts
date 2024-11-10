import * as v from 'valibot'
/**
 * This file defines the types used in the BrakemanIgnore module
 * If you want to confirm the brakeman.ignore file format, pleae refer to the following site:
 *   https://github.com/presidentbeef/brakeman/blob/4313af20b04eafec9460a46bf1b1fb38789cc8f2/test/tests/ignore.rb#L237
 */

const BrakemanLocationSchema = v.object({
  type: v.nullable(v.string()),
  class: v.nullable(v.string()),
  method: v.nullable(v.string())
})

const IgnoredWarningSchema = v.looseObject({
  warning_type: v.nullable(v.string()),
  warning_code: v.nullable(v.number()),
  fingerprint: v.nullable(v.string()),
  check_name: v.nullable(v.string()),
  message: v.nullable(v.string()),
  file: v.nullable(v.string()),
  line: v.nullable(v.number()),
  link: v.nullable(v.string()),
  code: v.nullable(v.string()),
  render_path: v.nullable(v.optional(v.string())),
  location: v.nullable(BrakemanLocationSchema),
  user_input: v.nullable(v.string()),
  confidence: v.nullable(v.string()),
  note: v.pipe(
    v.string('note property cannot be empty string'),
    v.minLength(5, issue => {
      return `note property must be at least 5 characters long. Current length: ${issue.input.length}`
    })
  )
})

export const BrakemanIgnoreFileSchema = v.object({
  ignored_warnings: v.array(IgnoredWarningSchema),
  updated: v.nullable(v.string()),
  brakeman_version: v.nullable(v.string())
})

export type BrakemanIgnoreFile = v.InferOutput<typeof BrakemanIgnoreFileSchema>
