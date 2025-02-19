import { setUser } from "./userActions"; // Eğer setUser başka bir dosyadaysa, doğru yolu belirtmeyi unutma

export const loginUser = (data, rememberMe) => {
  return async (dispatch) => {
    try {
      // Giriş işlemini burada gerçekleştirebilirsin (API çağrısı vs.)
      const user = { email: data.email, token: "example-token" }; // Örnek kullanıcı verisi

      // Kullanıcı bilgilerini state'e ekle
      dispatch(setUser(user));

      if (rememberMe) {
        // Eğer "Remember me" seçilmişse, kullanıcıyı localStorage'a kaydedebilirsin
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    } catch (error) {
      throw new Error("Login failed");
    }
  };
};
