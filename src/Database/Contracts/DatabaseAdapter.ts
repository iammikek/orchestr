/**
 * DatabaseAdapter Interface
 *
 * Defines the contract that all ORM adapters must implement.
 * This allows Orchestr to work with different ORMs (Drizzle, Prisma, TypeORM, etc.)
 */

export interface DatabaseConfig {
  driver: string;
  host?: string;
  port?: number;
  database: string;
  username?: string;
  password?: string;
  poolMin?: number;
  poolMax?: number;
  [key: string]: any;
}

export interface QueryResult<T = any> {
  rows: T[];
  rowCount: number;
  fields?: any[];
}

export interface DatabaseAdapter {
  /**
   * Connect to the database
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  disconnect(): Promise<void>;

  /**
   * Execute a raw SQL query
   */
  query<T = any>(sql: string, bindings?: any[]): Promise<QueryResult<T>>;

  /**
   * Execute a SELECT query
   */
  select<T = any>(sql: string, bindings?: any[]): Promise<T[]>;

  /**
   * Execute an INSERT query
   */
  insert(sql: string, bindings?: any[]): Promise<any>;

  /**
   * Execute an UPDATE query
   */
  update(sql: string, bindings?: any[]): Promise<number>;

  /**
   * Execute a DELETE query
   */
  delete(sql: string, bindings?: any[]): Promise<number>;

  /**
   * Begin a transaction
   */
  beginTransaction(): Promise<void>;

  /**
   * Commit a transaction
   */
  commit(): Promise<void>;

  /**
   * Rollback a transaction
   */
  rollback(): Promise<void>;

  /**
   * Execute a callback within a transaction
   */
  transaction<T>(callback: (adapter: DatabaseAdapter) => Promise<T>): Promise<T>;

  /**
   * Check if adapter is connected
   */
  isConnected(): boolean;

  /**
   * Get the underlying driver instance
   */
  getDriver(): any;

  /**
   * Get table information
   */
  getTableInfo(tableName: string): Promise<any>;

  /**
   * Get all table names
   */
  getTables(): Promise<string[]>;
}
