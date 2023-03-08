import jwtDecode from "jwt-decode";

const checkToken = (): boolean => {
  const token = JSON.parse(localStorage.getItem("userInfo") || "{}").token;

  if (token) {
    const decodedToken: { [key: string]: any } = jwtDecode(token);

    const currentTime: number = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      return true;
    }
  } else {
    return false;
  }

  return false;
};

export default checkToken;
