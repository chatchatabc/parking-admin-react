export async function authLogin(values: Record<string, any>) {
  const { username, password } = values;

  if (username === "admin" && password === "admin") {
    document.cookie = "token=123; path=/; max-age=3600";

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

export async function authLogout() {
  document.cookie = "token=; path=/; max-age=0";
}

export function authCheckSession() {
  const cookie = document.cookie;

  const token = cookie.split("; ").find((row) => row.startsWith("token="));

  if (token) {
    return true;
  }

  return false;
}
