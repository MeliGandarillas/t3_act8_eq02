const LOGIN_URL = "https://dummyjson.com/auth/login";

export async function loginUser(username, password) {
  const response = await fetch(LOGIN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Usuario o contraseña incorrectos");
  }

  const userData = await response.json();
  return userData;
}
