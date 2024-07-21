const ApiPath = {
  API_URL: 'http://localhost:3000',

  // Auth routes
  AUTH: "/auth",
  AUTHENTICATED_USER: "/authenticated-user",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",

  // Workouts routes
  WORKOUTS: "/workouts",
  WORKOUTS_BY_DATE: "/workouts/date/:date",
  WORKOUTS_BY_ID: "/workouts/:id",

} as const;

export { ApiPath };
