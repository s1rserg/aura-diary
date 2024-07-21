type ApiAuthPayload = {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};

export { type ApiAuthPayload };
