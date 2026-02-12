/**
 * Command
 *
 * Base class for all console commands
 */

export interface CommandOptions {
  [key: string]: any;
}

export abstract class Command {
  /**
   * The name of the command
   */
  abstract signature: string;

  /**
   * The description of the command
   */
  abstract description: string;

  /**
   * Execute the command
   */
  abstract handle(args: string[], options: CommandOptions): Promise<void>;

  /**
   * Write a message to the console
   */
  protected info(message: string): void {
    console.log(`\x1b[32m${message}\x1b[0m`);
  }

  /**
   * Write an error message to the console
   */
  protected error(message: string): void {
    console.error(`\x1b[31m${message}\x1b[0m`);
  }

  /**
   * Write a warning message to the console
   */
  protected warn(message: string): void {
    console.warn(`\x1b[33m${message}\x1b[0m`);
  }

  /**
   * Write a comment message to the console
   */
  protected comment(message: string): void {
    console.log(`\x1b[90m${message}\x1b[0m`);
  }

  /**
   * Write a question message to the console
   */
  protected question(message: string): void {
    console.log(`\x1b[36m${message}\x1b[0m`);
  }

  /**
   * Write a line to the console
   */
  protected line(message: string = ''): void {
    console.log(message);
  }

  /**
   * Write a newline to the console
   */
  protected newLine(count: number = 1): void {
    for (let i = 0; i < count; i++) {
      console.log();
    }
  }

  /**
   * Write a table to the console
   */
  protected table(headers: string[], rows: any[][]): void {
    console.table(rows, headers);
  }

  /**
   * Get the command name from the signature
   */
  getName(): string {
    return this.signature.split(' ')[0];
  }
}
