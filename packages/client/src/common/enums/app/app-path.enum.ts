const AppPath = {
  ROOT: '/',
  EXERCISES: '/exercises',
  EXERCISE: '/exercises/:id',
  LISTINGS: '/listings',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  NOT_FOUND: '/not-found',
  ANY: '*',
} as const;

export { AppPath };
