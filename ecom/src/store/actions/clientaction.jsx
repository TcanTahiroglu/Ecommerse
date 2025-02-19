import { toast } from "react-toastify";

export const loginUser = (data, rememberMe) => {
  return async (dispatch) => {
    try {
      // API çağrısı yapalım, örneğin Postman'deki endpoint
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Login failed!");
      }

      const result = await response.json();
      const { user, token } = result;

      // Kullanıcıyı Redux store'a kaydedelim
      dispatch({ type: "SET_USER", payload: user });

      // Eğer rememberMe seçiliyse token'ı localStorage'a kaydedelim
      if (rememberMe) {
        localStorage.setItem("token", token);
      }

      // Başarılı login sonrası, kullanıcıyı yönlendirelim
      return user;
    } catch (error) {
      // Hata durumunda, toast mesajı gösterelim
      toast.error("Login failed! Please check your credentials.");
      throw error;
    }
  };
};
