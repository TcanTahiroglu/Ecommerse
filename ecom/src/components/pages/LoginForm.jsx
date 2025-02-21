import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/actions/clientaction"; // loginUser fonksiyonunu kullanıyoruz
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import md5 from "md5"; // Gravatar için md5 hashleme

const LoginForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Remember me state'i
  const [rememberMe, setRememberMe] = useState(false);

  // Form submit işlemi
  const onSubmit = async (data) => {
    try {
      // Kullanıcıyı login et
      const user = await dispatch(loginUser(data, rememberMe));
      navigate(-1); // Başarılı girişten sonra, önceki sayfaya yönlendir
    } catch (error) {
      toast.error("Login failed! Please check your credentials."); // Hata durumunda toast mesajı
    }
  };

  // Gravatar URL oluşturma
  const getGravatarUrl = (email) => {
    const emailHash = md5(email.toLowerCase().trim());
    return `https://www.gravatar.com/avatar/${emailHash}?d=mp`;
  };

  return (
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
            <input 
              type="checkbox" 
              id="rememberMe" 
              checked={rememberMe} 
              onChange={() => setRememberMe(!rememberMe)} 
              className="mr-2"
            />
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
    </div>
  );
};

export default LoginForm;
