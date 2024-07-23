type ApiAuthPayload = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

export { type ApiAuthPayload };
