const AppPath = {
  ROOT: '/',
  SKILLS: '/skills',
  SKILL: '/skills/:id',
  LISTINGS: '/listings',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  NOT_FOUND: '/not-found',
  ANY: '*',
} as const;

export { AppPath };
