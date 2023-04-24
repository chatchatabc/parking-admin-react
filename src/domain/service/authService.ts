export async function authLogin(values: Record<string, any>) {
  const { username, password } = values;

  if (username === "admin" && password === "admin") {
    return {
      username: "admin",
    };
  }

  return {
    error: {
      message: "Invalid username or password",
    },
  };
}
