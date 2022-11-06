const signInUser = {
  email: "user@email.com",
  password: "opxjksh45x",
};

const signUpUser = {
  email: "user2@email.com",
  password: "opxjksh45x",
  firstName: "Tester2",
  lastName: "User2",
  role: "member"
};

const sign = {
  id: "634b2a53c85bdce2fbb81e69",
  email: "user@email.com",
  role: "member",
  fullName: "Tester User",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
};

const newSign = {
  id: "554b2a53c85bdce2fbb81e55",
  email: "user2@email.com",
  role: "member",
  fullName: "Tester2 User2",
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
};

const getUser = {
  _id: "634b2a53c85bdce2fbb81e69",
  email: "user@email.com",
  password: "$2b$10$u.b0oyRuapv9FXpbLJD9j.s8RbRTEW3.xvwprP04DeYqsszQIMO56",
  firstName: "Tester",
  lastName: "User",
  role: "member",
  createdAt: "2022-10-15T21:46:59.615Z",
  updatedAt: "2022-10-15T21:46:59.615Z"
};

const newUser = {
  _id: "554b2a53c85bdce2fbb81e55",
  email: "user2@email.com",
  password: "$2b$10$u.b0oyRuapv9FXpbLJD9j.s8RbRTEW3.xvwprP04DeYqsszQIMO56",
  firstName: "Tester2",
  lastName: "User2",
  role: "member",
  createdAt: "2022-10-15T21:46:59.615Z",
  updatedAt: "2022-10-15T21:46:59.615Z"
};

export { sign, signInUser, signUpUser, getUser, newUser, newSign };
