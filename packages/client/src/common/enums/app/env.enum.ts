const { VITE_API_URL } = import.meta.env;

const ENV = {
  API: {
    URL: VITE_API_URL,
  },
} as const;

export { ENV };
