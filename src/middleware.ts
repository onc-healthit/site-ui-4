export { default } from 'next-auth/middleware'
//the /admin is a placeholder. An /admin route does not actually exist in the app.
export const config = { matcher: ['/admin'] }
