const setAuthToken = (token: string) => {
  if (window) {
    document.cookie = `auth_token=${token}; path=/`;
  }
};

const getAuthToken = (): string => {
  if (window) {
    const cookies = document.cookie
      .split("; ")
      .reduce<Record<string, string>>((acc, cookie) => {
        const [name, value] = cookie.split("=");
        acc[name] = value;
        return acc;
      }, {});
    const token = cookies["auth_token"];
    return token;
  }

  return "";
};

export { setAuthToken, getAuthToken };
