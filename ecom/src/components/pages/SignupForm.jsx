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
      <input {...register("name", { required: true, minLength: 3 })} className="border p-2 w-full" />
      {errors.name && <p className="text-red-500">Name is required (min 3 chars).</p>}

      <label>Email:</label>
      <input {...register("email", { required: true, pattern: /^[^@\s]+@[^@\s]+\.[^@\s]+$/ })} className="border p-2 w-full" />
      {errors.email && <p className="text-red-500">Invalid email format.</p>}

      <label>Password:</label>
      <input {...register("password", { required: true, minLength: 8 })} type="password" className="border p-2 w-full" />
      {errors.password && <p className="text-red-500">Password must be at least 8 characters long.</p>}

      <label>Confirm Password:</label>
      <input {...register("password_confirmation", { validate: (value) => value === watch("password") })} type="password" className="border p-2 w-full" />
      {errors.password_confirmation && <p className="text-red-500">Passwords must match.</p>}

      <label>Role:</label>
      <select {...register("role_id")} className="border p-2 w-full">
        {roles.map((role) => (
          <option key={role.id} value={role.id}>{role.name}</option>
        ))}
      </select>

      {selectedRole === "store" && (
        <div>
          <label>Store Name:</label>
          <input {...register("store.name", { required: true, minLength: 3 })} className="border p-2 w-full" />
          {errors.store?.name && <p className="text-red-500">Store name must be at least 3 characters.</p>}

          <label>Store Phone:</label>
          <input {...register("store.phone", { required: true, pattern: /^\+90\d{10}$/ })} className="border p-2 w-full" />
          {errors.store?.phone && <p className="text-red-500">Invalid Türkiye phone number.</p>}

          <label>Store Tax ID:</label>
          <input {...register("store.tax_no", { required: true, pattern: /^T\d{4}V\d{6}$/ })} className="border p-2 w-full" />
          {errors.store?.tax_no && <p className="text-red-500">Invalid Tax ID format.</p>}

          <label>Store Bank Account:</label>
          <input {...register("store.bank_account", { required: true, pattern: /^TR\d{24}$/ })} className="border p-2 w-full" />
          {errors.store?.bank_account && <p className="text-red-500">Invalid IBAN format.</p>}
        </div>
      )}

      <button type="submit" disabled={loading} className="bg-blue-500 text-white p-2 mt-4 w-full rounded">
        {loading ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
};

export default Signup;
