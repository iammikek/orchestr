/**
 * EnsembleCollection Class
 *
 * A collection of Ensemble models
 */

import { Ensemble } from './Ensemble';

export class EnsembleCollection<T extends Ensemble> extends Array<T> {
  /**
   * Create a new collection
   */
  constructor(items: T[] = []) {
    super(...items);
    Object.setPrototypeOf(this, EnsembleCollection.prototype);
  }

  /**
   * Get all items in the collection
   */
  all(): T[] {
    return [...this];
  }

  /**
   * Get the first item from the collection
   */
  first(callback?: (item: T) => boolean): T | undefined {
    if (callback) {
      return this.find(callback);
    }
    return this[0];
  }

  /**
   * Get the last item from the collection
   */
  last(callback?: (item: T) => boolean): T | undefined {
    if (callback) {
      const filtered = this.filter(callback);
      return filtered[filtered.length - 1];
    }
    return this[this.length - 1];
  }

  /**
   * Reject items from the collection using a callback
   */
  reject(callback: (item: T, index: number) => boolean): EnsembleCollection<T> {
    return new EnsembleCollection(this.filter((item, index) => !callback(item, index)));
  }

  /**
   * Map the collection and return a new collection
   */
  mapIntoCollection<U>(callback: (item: T, index: number) => U): U[] {
    return this.map((item, index) => callback(item, index));
  }

  /**
   * Get a collection with only unique items
   */
  unique(key?: keyof T): EnsembleCollection<T> {
    if (!key) {
      return new EnsembleCollection([...new Set(this)]);
    }

    const seen = new Set();
    const unique: T[] = [];

    for (const item of this) {
      const value = item[key];
      if (!seen.has(value)) {
        seen.add(value);
        unique.push(item);
      }
    }

    return new EnsembleCollection(unique);
  }

  /**
   * Get the collection of items as a plain array
   */
  toArray(): Record<string, any>[] {
    return this.map((item) => item.toObject());
  }

  /**
   * Get the collection of items as JSON
   */
  toJSON(): Record<string, any>[] {
    return this.toArray();
  }

  /**
   * Determine if the collection is empty
   */
  isEmpty(): boolean {
    return this.length === 0;
  }

  /**
   * Determine if the collection is not empty
   */
  isNotEmpty(): boolean {
    return this.length > 0;
  }

  /**
   * Get the sum of the given values
   */
  sum(key?: keyof T): number {
    if (!key) {
      return 0;
    }

    return this.reduce((sum, item) => sum + Number(item[key] || 0), 0);
  }

  /**
   * Get the average value of a given key
   */
  avg(key?: keyof T): number {
    if (this.isEmpty()) {
      return 0;
    }

    return this.sum(key) / this.length;
  }

  /**
   * Get the min value of a given key
   */
  min(key?: keyof T): number | undefined {
    if (this.isEmpty() || !key) {
      return undefined;
    }

    return Math.min(...this.map((item) => Number(item[key] || 0)));
  }

  /**
   * Get the max value of a given key
   */
  max(key?: keyof T): number | undefined {
    if (this.isEmpty() || !key) {
      return undefined;
    }

    return Math.max(...this.map((item) => Number(item[key] || 0)));
  }

  /**
   * Pluck an attribute from each model
   */
  pluck(key: keyof T): any[] {
    return this.map((item) => item[key]);
  }

  /**
   * Get the keys of the collection items
   */
  modelKeys(): any[] {
    return this.map((item) => item.getKey());
  }

  /**
   * Sort the collection by a callback or key
   */
  sortBy(keyOrCallback: keyof T | ((a: T, b: T) => number)): EnsembleCollection<T> {
    const sorted = [...this];

    if (typeof keyOrCallback === 'function') {
      sorted.sort(keyOrCallback);
    } else {
      sorted.sort((a, b) => {
        const aVal = a[keyOrCallback];
        const bVal = b[keyOrCallback];

        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
      });
    }

    return new EnsembleCollection(sorted);
  }

  /**
   * Sort the collection in descending order
   */
  sortByDesc(key: keyof T): EnsembleCollection<T> {
    return this.sortBy((a, b) => {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal < bVal) return 1;
      if (aVal > bVal) return -1;
      return 0;
    });
  }

  /**
   * Group the collection by a given key
   */
  groupBy(key: keyof T): Record<string, EnsembleCollection<T>> {
    const groups: Record<string, T[]> = {};

    for (const item of this) {
      const groupKey = String(item[key]);

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }

      groups[groupKey].push(item);
    }

    const result: Record<string, EnsembleCollection<T>> = {};
    for (const [key, items] of Object.entries(groups)) {
      result[key] = new EnsembleCollection(items);
    }

    return result;
  }

  /**
   * Chunk the collection into smaller collections
   */
  chunkModels(size: number): EnsembleCollection<T>[] {
    const chunks: EnsembleCollection<T>[] = [];

    for (let i = 0; i < this.length; i += size) {
      chunks.push(new EnsembleCollection(this.slice(i, i + size)));
    }

    return chunks;
  }

  /**
   * Take the first n items
   */
  take(limit: number): EnsembleCollection<T> {
    return new EnsembleCollection(this.slice(0, limit));
  }

  /**
   * Skip the first n items
   */
  skip(count: number): EnsembleCollection<T> {
    return new EnsembleCollection(this.slice(count));
  }

  /**
   * Merge the collection with the given items
   */
  merge(items: T[]): EnsembleCollection<T> {
    return new EnsembleCollection([...this, ...items]);
  }

  /**
   * Get the collection without the specified items
   */
  except(keys: any[]): EnsembleCollection<T> {
    const keySet = new Set(keys);
    return new EnsembleCollection(this.filter((item) => !keySet.has(item.getKey())));
  }

  /**
   * Get only the specified items from the collection
   */
  only(keys: any[]): EnsembleCollection<T> {
    const keySet = new Set(keys);
    return new EnsembleCollection(this.filter((item) => keySet.has(item.getKey())));
  }

  /**
   * Load a set of relationships onto the collection
   */
  async load(relations: string | string[]): Promise<this> {
    // TODO: Implement eager loading
    // This will be implemented when we add relationship support
    return this;
  }

  /**
   * Find a model in the collection by key
   */
  find(keyOrCallback: any | ((item: T) => boolean)): T | undefined {
    if (typeof keyOrCallback === 'function') {
      return super.find(keyOrCallback);
    }

    return super.find((item) => item.getKey() === keyOrCallback);
  }

  /**
   * Determine if a key exists in the collection
   */
  contains(keyOrCallback: any | ((item: T) => boolean)): boolean {
    return this.find(keyOrCallback) !== undefined;
  }

  /**
   * Get the items with the specified keys
   */
  whereIn(key: keyof T, values: any[]): EnsembleCollection<T> {
    const valueSet = new Set(values);
    return new EnsembleCollection(super.filter((item) => valueSet.has(item[key])));
  }

  /**
   * Get the items where a key is not in the given values
   */
  whereNotIn(key: keyof T, values: any[]): EnsembleCollection<T> {
    const valueSet = new Set(values);
    return new EnsembleCollection(super.filter((item) => !valueSet.has(item[key])));
  }

  /**
   * Count the number of items in the collection
   */
  count(): number {
    return this.length;
  }
}
