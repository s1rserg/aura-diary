const ApiPath = {
  API_URL: import.meta.env.VITE_API_PATH,

  // Auth routes
  AUTH: "/auth",
  AUTHENTICATED_USER: "/authenticated-user",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",

  // Workouts routes
  WORKOUTS: "/workouts",
  WORKOUTS_BY_DATE: "/workouts/date/:date",
  WORKOUTS_BY_ID: "/workouts/:id",

  // Friends routes
  FRIENDS: "/friends"

} as const;

export { ApiPath };
