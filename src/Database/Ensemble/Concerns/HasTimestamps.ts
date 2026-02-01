/**
 * HasTimestamps Concern
 *
 * Provides timestamp handling functionality for models
 */

export interface HasTimestamps {
  /**
   * Indicates if the model should be timestamped
   */
  timestamps: boolean;

  /**
   * Update the model's timestamps
   */
  updateTimestamps(): void;

  /**
   * Set the value of the "created at" attribute
   */
  setCreatedAt(value: Date): void;

  /**
   * Set the value of the "updated at" attribute
   */
  setUpdatedAt(value: Date): void;

  /**
   * Get the name of the "created at" column
   */
  getCreatedAtColumn(): string;

  /**
   * Get the name of the "updated at" column
   */
  getUpdatedAtColumn(): string;

  /**
   * Determine if the model uses timestamps
   */
  usesTimestamps(): boolean;
}

/**
 * Default timestamp column names
 */
export const CREATED_AT = 'created_at';
export const UPDATED_AT = 'updated_at';
