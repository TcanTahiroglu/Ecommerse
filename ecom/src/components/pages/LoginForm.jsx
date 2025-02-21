<<<<<<< HEAD
import React from 'react';
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from '../../store/actions/actions'; 
import { useNavigate } from 'react-router-dom'; // useHistory yerine useNavigate kullanıyoruz
=======
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/clientaction";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Gravatar from "react-gravatar";
>>>>>>> 53788646f71bbd2f86816460fe09050d2c71013b

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
<<<<<<< HEAD

  const onSubmit = async (data) => {
    try {
      // Login işlemi için action dispatch et
      await dispatch(login(data.email, data.password));

      // Başarılı girişten sonra kullanıcıyı yönlendir
      navigate('/');
    } catch (error) {
      // Hata durumunda konsola loglama
      console.error('Login failed:', error);

      // Eğer login başarısız olursa, kullanıcıyı login sayfasında tut
      alert('Login failed! Please check your credentials.');
=======
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data) => {
    try {
      const user = await dispatch(loginUser(data, rememberMe));
      navigate(-1);
    } catch (error) {
      toast.error("Login failed! Please check your credentials.");
>>>>>>> 53788646f71bbd2f86816460fe09050d2c71013b
    }
  };

  return (
<<<<<<< HEAD
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Password is required' })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <div className="form-group flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-sm text-gray-700">Remember me</label>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
=======
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
>>>>>>> 53788646f71bbd2f86816460fe09050d2c71013b
    </div>
  );
};

export default LoginForm;
