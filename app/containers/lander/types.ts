export type LandingStackParamList = {
  LandingPage: {
    setTeacherId: (teacherId: string) => void;
  };
  LoginPage: {
    handleLogin: (teacherId: string) => void;
  };
  SignupPage: {
    handleSignup: (teacherId: string) => void;
  };
};
