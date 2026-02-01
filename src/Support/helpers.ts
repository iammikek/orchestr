/**
 * Helper functions - Laravel-style global helpers
 */

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
