const AppPath = {
  ROOT: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FRIENDS: "/friends",
  STATS: "/stats/:userId",
  ANY: "*",
} as const;

export { AppPath };
