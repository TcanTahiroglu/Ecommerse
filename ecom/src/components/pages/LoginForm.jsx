import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/clientaction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Gravatar from "react-gravatar";

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(loginUser(data, rememberMe));
      navigate(-1);
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
    }
  };

  return (
    <div className="login-form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>

        <div>
          <input
            type="checkbox"
            id="rememberMe"
            onChange={() => setRememberMe(!rememberMe)}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
