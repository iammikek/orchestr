/**
 * MigrationCreator
 *
 * Creates new migration files from stubs
 */

import * as fs from 'fs';
import * as path from 'path';

export class MigrationCreator {
  constructor(protected customStubPath?: string) {}

  /**
   * Create a new migration file
   */
  async create(name: string, migrationPath: string, table?: string, create: boolean = false): Promise<string> {
    this.ensureMigrationDirectoryExists(migrationPath);

    const fileName = this.getDatePrefix() + '_' + name + '.ts';
    const filePath = path.join(migrationPath, fileName);

    const stub = this.getStub(table, create);
    const populated = this.populateStub(stub, table);

    fs.writeFileSync(filePath, populated);

    return filePath;
  }

  /**
   * Get the migration stub
   */
  protected getStub(table?: string, create: boolean = false): string {
    if (table && create) {
      return this.getCreateStub();
    }

    if (table) {
      return this.getUpdateStub();
    }

    return this.getBlankStub();
  }

  /**
   * Get the blank migration stub
   */
  protected getBlankStub(): string {
    return `import { Migration } from '@orchestr-sh/orchestr';
import { Schema } from '@orchestr-sh/orchestr';

export default class extends Migration {
  /**
   * Run the migrations
   */
  async up(schema: Schema): Promise<void> {
    //
  }

  /**
   * Reverse the migrations
   */
  async down(schema: Schema): Promise<void> {
    //
  }
}
`;
  }

  /**
   * Get the create table stub
   */
  protected getCreateStub(): string {
    return `import { Migration } from '@orchestr-sh/orchestr';
import { Schema } from '@orchestr-sh/orchestr';

export default class extends Migration {
  /**
   * Run the migrations
   */
  async up(schema: Schema): Promise<void> {
    await schema.create('{{table}}', (table) => {
      table.id();
      table.timestamps();
    });
  }

  /**
   * Reverse the migrations
   */
  async down(schema: Schema): Promise<void> {
    await schema.dropIfExists('{{table}}');
  }
}
`;
  }

  /**
   * Get the update table stub
   */
  protected getUpdateStub(): string {
    return `import { Migration } from '@orchestr-sh/orchestr';
import { Schema } from '@orchestr-sh/orchestr';

export default class extends Migration {
  /**
   * Run the migrations
   */
  async up(schema: Schema): Promise<void> {
    await schema.table('{{table}}', (table) => {
      //
    });
  }

  /**
   * Reverse the migrations
   */
  async down(schema: Schema): Promise<void> {
    await schema.table('{{table}}', (table) => {
      //
    });
  }
}
`;
  }

  /**
   * Populate the stub with table name
   */
  protected populateStub(stub: string, table?: string): string {
    if (table) {
      return stub.replace(/\{\{table\}\}/g, table);
    }

    return stub;
  }

  /**
   * Get the date prefix for the migration
   */
  protected getDatePrefix(): string {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    return `${year}_${month}_${day}_${hour}${minute}${second}`;
  }

  /**
   * Ensure the migration directory exists
   */
  protected ensureMigrationDirectoryExists(path: string): void {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }
}
