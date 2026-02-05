/**
 * Helper functions - Laravel-style global helpers
 */

import { Application } from '../Foundation/Application';
import type { Config as ConfigClass } from '../Foundation/Config/Config';

// Global application instance for helpers
let globalApp: Application | null = null;

/**
 * Set the global application instance
 * @internal
 */
export function setGlobalApp(app: Application): void {
  globalApp = app;
}

/**
 * Get a configuration value
 * Laravel: config('app.name') or config('app.name', 'default')
 *
 * @param {string} key
 * @param {any} defaultValue
 * @returns {any}
 */
export function config<T = any>(key?: string, defaultValue?: T): T | ConfigClass {
  if (!globalApp) {
    throw new Error('Application not initialized. Call setGlobalApp() first.');
  }

  const configInstance = globalApp.make<ConfigClass>('config');

  // If no key provided, return the config instance
  if (key === undefined) {
    return configInstance as any;
  }

  return configInstance.get(key, defaultValue);
}

/**
 * Load routes from a directory
 * This helper allows you to dynamically import route files
 */
export async function loadRoutes(routePath: string): Promise<void> {
  try {
    await import(routePath);
  } catch (error) {
    throw new Error(`Failed to load routes from ${routePath}: ${error}`);
  }
}

/**
 * Resolve a path relative to the base path
 */
export function base_path(path: string = ''): string {
  return `${process.cwd()}${path ? '/' + path : ''}`;
}

/**
 * Get the routes directory path
 */
export function routes_path(path: string = ''): string {
  return base_path(`routes${path ? '/' + path : ''}`);
}
