const ApiPath = {
  API_URL: import.meta.env.VITE_API_PATH || 'http://localhost:3000',

  // Auth routes
  AUTH: '/auth',
  AUTHENTICATED_USER: '/authenticated-user',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',

  // Skills routes
  SKILLS: '/skills',

  // Images routes
  IMAGES: '/images',

  // Attributes routes
  ATTRIBUTES: '/attributes',
} as const;

export { ApiPath };
