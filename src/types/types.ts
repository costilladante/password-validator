/**
 * The definition of a rule
 */
export interface Rule {
  /**
   * The name of the rule
   */
  name: string
  /**
   * The message to display if the rule is not met
   */
  message: string
  /**
   * The RegEx or function that validates the rule
   */
  validate: RegExp | ((password: string) => boolean)
}
