/**
 * Base abstract class for password validation rules.
 * Each rule must implement a `validate` method returning `null` if the password is valid,
 * or an error message if not.
 */
export abstract class Rule {
  /**
   * @param name - A name for the rule
   * @param message - The message to return when validation fails
   */

  // ? Idea: what about a unique id?
  // * Idea: consider adding a description prop
  constructor(
    public name: string,
    public message: string,
  ) {}

  /**
   * Validates the password against the rule.
   * @param password - The password to validate
   * @returns `null` if valid, or an error message if invalid
   */
  abstract validate(password: string): string | null
}

/**
 * A rule that validates using a RegExp.
 */
export class RegExpRule extends Rule {
  /**
   * @param name - A name for the rule
   * @param message - The message to return when validation fails
   * @param pattern - The regular expression to validate the password against
   */
  constructor(
    name: string,
    message: string,
    private pattern: RegExp,
  ) {
    super(name, message)
  }

  /** @inheritdoc */
  validate(password: string): string | null {
    return this.pattern.test(password) ? null : this.message
  }
}

/**
 * A rule that validates the password using a custom function.
 */
export class FunctionRule extends Rule {
  /**
   * @param name - A name for the rule
   * @param message - The message to return when validation fails
   * @param validator - A function that returns true if the password is valid
   */
  constructor(
    name: string,
    message: string,
    private validator: (password: string) => boolean,
  ) {
    super(name, message)
  }

  /** @inheritdoc */
  validate(password: string): string | null {
    return this.validator(password) ? null : this.message
  }
}

/**
 * A set of validation rules to be applied to a password.
 */
export class RuleSet {
  /**
   * Validates the password against all rules.
   * @param password - The password to validate
   * @returns An array of error messages for each failed rule, or an empty array if all pass
   */
  constructor(public rules: Rule[]) {}

  /**
   * Validates the password against all rules.
   * @param password - The password to validate
   * @returns An array of error messages for each failed rule, or an empty array if all pass
   */
  validate(password: string): string[] {
    return this.rules.map((rule) => rule.validate(password)).filter((result) => result !== null)
  }

  // * Idea: Add a method to get a list of the rules that failed

  // * Idea: Add a method to validate all the rules

  // * Idea: Add a method to get a list of the rules that passed

  // * Idea: Add a method to get all the rules names and probably the messages and the validator function or the regex
}
