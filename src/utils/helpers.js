// any helper functions go here
export function isAuthPath(path) {
  return path === '/' || path === '/signup' || path === '/login';
}
