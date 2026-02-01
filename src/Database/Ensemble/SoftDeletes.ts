/**
 * SoftDeletes Interface
 *
 * Provides soft delete functionality for models
 */

export interface SoftDeletes {
  /**
   * Indicates if the model is currently force deleting
   */
  forceDeleting: boolean;

  /**
   * Force a hard delete on a soft deleted model
   */
  forceDelete(): Promise<boolean>;

  /**
   * Restore a soft-deleted model instance
   */
  restore(): Promise<boolean>;

  /**
   * Determine if the model instance has been soft-deleted
   */
  trashed(): boolean;

  /**
   * Get the name of the "deleted at" column
   */
  getDeletedAtColumn(): string;

  /**
   * Get the fully qualified "deleted at" column
   */
  getQualifiedDeletedAtColumn(): string;
}

/**
 * Default deleted at column name
 */
export const DELETED_AT = 'deleted_at';

/**
 * Placeholder for soft deletes mixin
 * TODO: Implement mixin pattern or use a trait-like approach
 */
export function softDeletes(): any {
  console.warn('SoftDeletes mixin not yet implemented. Use interface for type checking.');
  return {};
}
