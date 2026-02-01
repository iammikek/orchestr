/**
 * Schema Interface
 *
 * Defines the contract for schema/migration operations
 */

export interface Schema {
  /**
   * Create a new table
   */
  create(tableName: string, callback: (table: Blueprint) => void): Promise<void>;

  /**
   * Drop a table
   */
  drop(tableName: string): Promise<void>;

  /**
   * Drop a table if it exists
   */
  dropIfExists(tableName: string): Promise<void>;

  /**
   * Rename a table
   */
  rename(from: string, to: string): Promise<void>;

  /**
   * Determine if a table exists
   */
  hasTable(tableName: string): Promise<boolean>;

  /**
   * Determine if a column exists on a table
   */
  hasColumn(tableName: string, columnName: string): Promise<boolean>;

  /**
   * Modify an existing table
   */
  table(tableName: string, callback: (table: Blueprint) => void): Promise<void>;
}

export interface Blueprint {
  /**
   * The table the blueprint describes
   */
  table: string;

  /**
   * Add an auto-incrementing ID column
   */
  id(column?: string): ColumnDefinition;

  /**
   * Add a big auto-incrementing ID column
   */
  bigIncrements(column: string): ColumnDefinition;

  /**
   * Add an auto-incrementing column
   */
  increments(column: string): ColumnDefinition;

  /**
   * Add a UUID column
   */
  uuid(column: string): ColumnDefinition;

  /**
   * Add a string column
   */
  string(column: string, length?: number): ColumnDefinition;

  /**
   * Add a text column
   */
  text(column: string): ColumnDefinition;

  /**
   * Add a medium text column
   */
  mediumText(column: string): ColumnDefinition;

  /**
   * Add a long text column
   */
  longText(column: string): ColumnDefinition;

  /**
   * Add an integer column
   */
  integer(column: string): ColumnDefinition;

  /**
   * Add a big integer column
   */
  bigInteger(column: string): ColumnDefinition;

  /**
   * Add a small integer column
   */
  smallInteger(column: string): ColumnDefinition;

  /**
   * Add a tiny integer column
   */
  tinyInteger(column: string): ColumnDefinition;

  /**
   * Add a decimal column
   */
  decimal(column: string, precision?: number, scale?: number): ColumnDefinition;

  /**
   * Add a float column
   */
  float(column: string, precision?: number, scale?: number): ColumnDefinition;

  /**
   * Add a double column
   */
  double(column: string, precision?: number, scale?: number): ColumnDefinition;

  /**
   * Add a boolean column
   */
  boolean(column: string): ColumnDefinition;

  /**
   * Add a date column
   */
  date(column: string): ColumnDefinition;

  /**
   * Add a datetime column
   */
  datetime(column: string, precision?: number): ColumnDefinition;

  /**
   * Add a timestamp column
   */
  timestamp(column: string, precision?: number): ColumnDefinition;

  /**
   * Add created_at and updated_at timestamp columns
   */
  timestamps(precision?: number): void;

  /**
   * Add a JSON column
   */
  json(column: string): ColumnDefinition;

  /**
   * Add a JSONB column
   */
  jsonb(column: string): ColumnDefinition;

  /**
   * Add a binary column
   */
  binary(column: string): ColumnDefinition;

  /**
   * Add an enum column
   */
  enum(column: string, values: string[]): ColumnDefinition;

  /**
   * Add a remember token column
   */
  rememberToken(): ColumnDefinition;

  /**
   * Add soft delete columns
   */
  softDeletes(column?: string): ColumnDefinition;

  /**
   * Add an index
   */
  index(columns: string | string[], indexName?: string): void;

  /**
   * Add a unique index
   */
  unique(columns: string | string[], indexName?: string): void;

  /**
   * Add a primary key
   */
  primary(columns: string | string[]): void;

  /**
   * Add a foreign key
   */
  foreign(columns: string | string[], indexName?: string): ForeignKeyDefinition;

  /**
   * Drop a column
   */
  dropColumn(column: string | string[]): void;

  /**
   * Drop an index
   */
  dropIndex(indexName: string): void;

  /**
   * Drop a foreign key
   */
  dropForeign(indexName: string): void;

  /**
   * Rename a column
   */
  renameColumn(from: string, to: string): void;
}

export interface ColumnDefinition {
  /**
   * Allow NULL values
   */
  nullable(): this;

  /**
   * Set a default value
   */
  default(value: any): this;

  /**
   * Mark as unsigned (for numeric types)
   */
  unsigned(): this;

  /**
   * Add a unique constraint
   */
  unique(): this;

  /**
   * Add an index
   */
  index(indexName?: string): this;

  /**
   * Set as primary key
   */
  primary(): this;

  /**
   * Add a comment
   */
  comment(comment: string): this;

  /**
   * Place column after another column
   */
  after(column: string): this;

  /**
   * Place column first
   */
  first(): this;
}

export interface ForeignKeyDefinition {
  /**
   * Specify the referenced column(s)
   */
  references(columns: string | string[]): this;

  /**
   * Specify the referenced table
   */
  on(table: string): this;

  /**
   * Set the ON DELETE action
   */
  onDelete(action: 'cascade' | 'set null' | 'restrict' | 'no action'): this;

  /**
   * Set the ON UPDATE action
   */
  onUpdate(action: 'cascade' | 'set null' | 'restrict' | 'no action'): this;
}
