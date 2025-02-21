import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
});

const Signup = () => {
  const { register, handleSubmit, watch, control, setValue, formState: { errors } } = useForm();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Error fetching roles", err));
  }, []);

  const selectedRole = watch("role_id");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post("/signup", data);
      alert("You need to click the link in the email to activate your account!");
      navigate(-1);
    } catch (error) {
      console.error("Signup error", error);
      alert("Signup failed. Please check your information and try again.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg mt-30">
      <label>Name:</label>
      <input {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters." } })} className="border p-2 w-full" />
      {errors.name && <p className="text-red-500">{errors.name.message}</p>}

      <label>Email:</label>
      <input {...register("email", { 
        required: "Email is required", 
        pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: "Invalid email format." } 
      })} className="border p-2 w-full" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <label>Password:</label>
      <input 
        {...register("password", { 
          required: "Password is required", 
          minLength: { value: 8, message: "Password must be at least 8 characters." }
        })} 
        type="password" 
        className="border p-2 w-full" 
      />
      {errors.password && <p className="text-red-500">{errors.password.message}</p>}

      <label>Confirm Password:</label>
      <input 
        {...register("password_confirmation", { 
          validate: (value) => value === watch("password") || "Passwords must match" 
        })} 
        type="password" 
        className="border p-2 w-full" 
      />
      {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation.message}</p>}

      <label>Role:</label>
      <select {...register("role_id", { required: "Role is required" })} className="border p-2 w-full">
        {roles.map((role) => (
          <option key={role.id} value={role.id}>{role.name}</option>
        ))}
      </select>

      {selectedRole === "store" && (
        <div>
          <label>Store Name:</label>
          <input {...register("store.name", { required: "Store name is required", minLength: { value: 3, message: "Store name must be at least 3 characters." } })} className="border p-2 w-full" />
          {errors.store?.name && <p className="text-red-500">{errors.store?.name.message}</p>}

          <label>Store Phone:</label>
          <input {...register("store.phone", { 
            required: "Phone number is required", 
            pattern: { value: /^\+90\d{10}$/, message: "Invalid Türkiye phone number." }
          })} className="border p-2 w-full" />
          {errors.store?.phone && <p className="text-red-500">{errors.store?.phone.message}</p>}

          <label>Store Tax ID:</label>
          <input {...register("store.tax_no", { 
            required: "Tax ID is required", 
            pattern: { value: /^T\d{4}V\d{6}$/, message: "Invalid Tax ID format." }
          })} className="border p-2 w-full" />
          {errors.store?.tax_no && <p className="text-red-500">{errors.store?.tax_no.message}</p>}

          <label>Store Bank Account:</label>
          <input {...register("store.bank_account", { 
            required: "Bank account is required", 
            pattern: { value: /^TR\d{24}$/, message: "Invalid IBAN format." }
          })} className="border p-2 w-full" />
          {errors.store?.bank_account && <p className="text-red-500">{errors.store?.bank_account.message}</p>}
        </div>
      )}

      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 mt-4 w-full rounded">
        {loading ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
