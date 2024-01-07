export type AuthStackParams = {
  welcome: undefined;
  login: undefined;
  signup: undefined;
  "forgot-password": undefined;
  "update-password": {
    code: string;
  };
  "code-input": {
    email: string;
  };
};
