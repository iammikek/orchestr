/**
 * EnsembleBuilder
 *
 * Extends the query builder to work with Ensemble models
 */

import { Builder as QueryBuilder } from '../Query/Builder';
import { DatabaseAdapter } from '../Contracts/DatabaseAdapter';
import { Ensemble } from './Ensemble';
import { EnsembleCollection } from './EnsembleCollection';

export class EnsembleBuilder<T extends Ensemble> extends QueryBuilder<T> {
  /**
   * The model being queried
   */
  protected model: T;

  /**
   * The relationships that should be eager loaded
   */
  protected eagerLoad: Record<string, any> = {};

  constructor(adapter: DatabaseAdapter, model: T) {
    super(adapter);
    this.model = model;
    this.from(model.getTable());
  }

  /**
   * Find a model by its primary key
   */
  async find(id: any): Promise<T | null> {
    return this.where(this.model.getKeyName(), '=', id).first();
  }

  /**
   * Execute the query and get all results
   */
  async get(): Promise<T[]> {
    const results = await super.get();
    return this.hydrate(results);
  }

  /**
   * Get the first record
   */
  async first(): Promise<T | null> {
    const result = await super.first();
    if (!result) {
      return null;
    }
    return this.newModelInstance(result, true);
  }

  /**
   * Create a collection of models from plain arrays
   */
  protected hydrate(items: any[]): T[] {
    return items.map((item) => this.newModelInstance(item, true));
  }

  /**
   * Create a new instance of the model
   */
  protected newModelInstance(attributes: Record<string, any> = {}, exists: boolean = false): T {
    const ModelClass = this.model.constructor as new (attributes: Record<string, any>) => T;
    const instance = new ModelClass(attributes);
    (instance as any).exists = exists;
    (instance as any).syncOriginal();
    return instance;
  }

  /**
   * Set the relationships that should be eager loaded
   */
  with(relations: string | string[]): this {
    const relationArray = Array.isArray(relations) ? relations : [relations];

    for (const relation of relationArray) {
      this.eagerLoad[relation] = () => {};
    }

    return this;
  }

  /**
   * Create a new model and store it in the database
   */
  async create(attributes: Record<string, any>): Promise<T> {
    const instance = this.newModelInstance(attributes);
    await instance.save();
    return instance;
  }

  /**
   * Update records in the database
   */
  async update(values: Record<string, any>): Promise<number> {
    return await super.update(values);
  }

  /**
   * Delete records from the database
   */
  async delete(): Promise<number> {
    return await super.delete();
  }

  /**
   * Get a paginated result
   */
  async paginate(perPage: number = 15, page: number = 1): Promise<{
    data: T[];
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
  }> {
    const total = await this.clone().count();
    const offset = (page - 1) * perPage;

    const data = await this.clone().offset(offset).limit(perPage).get();

    const lastPage = Math.ceil(total / perPage);
    const from = total > 0 ? offset + 1 : 0;
    const to = Math.min(offset + perPage, total);

    return {
      data,
      total,
      perPage,
      currentPage: page,
      lastPage,
      from,
      to,
    };
  }

  /**
   * Chunk the results of the query
   */
  async chunk(count: number, callback: (models: T[]) => Promise<boolean | void>): Promise<void> {
    let page = 1;

    do {
      const results = await this.clone()
        .offset((page - 1) * count)
        .limit(count)
        .get();

      if (results.length === 0) {
        break;
      }

      const shouldContinue = await callback(results);
      if (shouldContinue === false) {
        break;
      }

      page++;
    } while (true);
  }

  /**
   * Clone the query builder
   */
  clone(): EnsembleBuilder<T> {
    const cloned = new EnsembleBuilder<T>(this.adapter, this.model);
    cloned._columns = [...this._columns];
    cloned._distinct = this._distinct;
    cloned._table = this._table;
    cloned._wheres = [...this._wheres];
    cloned._joins = [...this._joins];
    cloned._orders = [...this._orders];
    cloned._groups = [...this._groups];
    cloned._havings = [...this._havings];
    cloned._limit = this._limit;
    cloned._offset = this._offset;
    cloned._bindings = [...this._bindings];
    cloned.eagerLoad = { ...this.eagerLoad };
    return cloned;
  }
}
