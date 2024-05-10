declare namespace Express {
    interface Request {
      token: {
        _id: string;
        fullname: string;
        email: string;
        role: "ADMIN" | "USER";
      };
    }
  }