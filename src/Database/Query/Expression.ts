/**
 * Expression Class
 *
 * Represents a raw SQL expression
 */

export class Expression {
  constructor(private readonly value: string) {}

  /**
   * Get the value of the expression
   */
  getValue(): string {
    return this.value;
  }

  /**
   * Convert the expression to a string
   */
  toString(): string {
    return this.value;
  }
}

/**
 * Create a new raw expression
 */
export function raw(value: string): Expression {
  return new Expression(value);
}
