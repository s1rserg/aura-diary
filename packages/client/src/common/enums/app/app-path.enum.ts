const AppPath = {
  ROOT: '/',
  EXERCISES: '/exercises',
  EXERCISE: '/exercises/:exerciseId',
  WORKOUTS: '/workouts',
  WORKOUT: '/workouts/:workoutId',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  PROFILE: '/profile',
  NOT_FOUND: '/not-found',
  ANY: '*',
} as const;

export { AppPath };
