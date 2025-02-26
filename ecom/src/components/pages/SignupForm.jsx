import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Create Axios instance
const api = axios.create({
  baseURL: "https://workintech-fe-ecommerce.onrender.com",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Request Config:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('Response:', {
      status: response.status,
      data: response.data,
      headers: response.headers
    });
    return response;
  },
  (error) => {
    console.error('Response Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      statusText: error.response?.statusText
    });
    return Promise.reject(error);
  }
);

const SignupForm = () => {
  const { register, handleSubmit, watch, formState: { errors }, setError } = useForm({
    defaultValues: {
      role_id: "1" // Customer selected by default
    }
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const selectedRole = watch("role_id");
  const password = watch("password");

  // Fetch roles on component mount
  useEffect(() => {
    api.get("/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => {
        console.error("Error fetching roles:", err);
        toast.error("Failed to load roles. Please refresh the page.");
      });
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("%cForm Data:", "color: blue; font-weight: bold", {
      raw_data: data,
      name: data.name,
      email: data.email,
      password: data.password,
      role_id: data.role_id,
      store_data: data.role_id === "2" ? {
        name: data.store_name,
        phone: data.store_phone,
        tax_no: data.store_tax_no,
        bank_account: data.store_bank_account
      } : null
    });
    
    try {
      // Validate required fields
      if (!data.name || !data.email || !data.password) {
        throw new Error("Name, email and password are required");
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        throw new Error("Please enter a valid email address");
      }

      // Prepare the submission data
      const submissionData = {
        name: data.name.trim(), 
        email: data.email.trim().toLowerCase(),
        password: data.password.replace(/[^a-zA-Z0-9]/g, ''), // Sadece alfanumerik karakterler
        role_id: 1
      };

      // Add store data if role is store
      if (data.role_id === "2") {
        if (!data.store_name || !data.store_phone || !data.store_tax_no || !data.store_bank_account) {
          throw new Error("All store fields are required for store registration");
        }

        submissionData.store = {
          name: data.store_name.trim(),
          phone: data.store_phone.replace(/\D/g, ''), // Sadece rakamları al
          tax_no: data.store_tax_no.trim(),
          bank_account: data.store_bank_account.replace(/\D/g, '') // Sadece rakamları al
        };

        // Store için role_id'yi 2 yapalım
        submissionData.role_id = 2;
      }

      // API isteğini yapmadan önce validasyonlar
      if (!submissionData.name || !submissionData.email || !submissionData.password) {
        throw new Error("Name, email and password cannot be empty");
      }

      if (submissionData.password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      // API isteğini yapmadan önce veriyi string'e çevirelim
      const requestData = JSON.stringify(submissionData);
      console.log("%cSubmitting to API:", "color: green; font-weight: bold", {
        raw: requestData,
        parsed: submissionData
      });

      const response = await api.post("/signup", requestData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log("%cAPI Response:", "color: green; font-weight: bold", response.data);
      
      toast.success("You need to click the link in the email to activate your account!");
      navigate(-1);
    } catch (error) {
      // If it's our validation error
      if (error.message && !error.response) {
        console.error("%cValidation Error:", "color: red; font-weight: bold", error.message);
        toast.error(error.message);
        return;
      }

      // If it's an API error
      console.error("%cAPI Error Details:", "color: red; font-weight: bold", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        request_data: error.config?.data
      });
      
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(`Registration failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-8 mb-8">
      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              },
              validate: {
                hasUpperCase: value => /[A-Z]/.test(value) || "Must contain at least one uppercase letter",
                hasLowerCase: value => /[a-z]/.test(value) || "Must contain at least one lowercase letter",
                hasNumber: value => /\d/.test(value) || "Must contain at least one number",
                hasSpecialChar: value => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Must contain at least one special character"
              }
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
          
          {/* Password requirements list */}
          <div className="mt-2 text-sm text-gray-600">
            <p className="font-medium mb-1">Password must:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Be at least 8 characters long</li>
              <li>Include at least one uppercase letter (A-Z)</li>
              <li>Include at least one lowercase letter (a-z)</li>
              <li>Include at least one number (0-9)</li>
              <li>Include at least one special character (!@#$%^&*)</li>
            </ul>
          </div>
        </div>

        {/* Password Confirmation Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            {...register("password_confirmation", {
              required: "Please confirm your password",
              validate: value => value === password || "Passwords do not match"
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.password_confirmation && <p className="mt-1 text-sm text-red-600">{errors.password_confirmation.message}</p>}
        </div>

        {/* Role Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <select
            {...register("role_id")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        {/* Store Fields - Only shown when store role is selected */}
        {selectedRole === "2" && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-medium">Store Information</h3>

            {/* Store Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Store Name</label>
              <input
                type="text"
                {...register("store_name", {
                  required: "Store name is required",
                  minLength: { value: 3, message: "Store name must be at least 3 characters" }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.store_name && <p className="mt-1 text-sm text-red-600">{errors.store_name.message}</p>}
            </div>

            {/* Store Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Store Phone</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  +90
                </span>
                <input
                  type="text"
                  {...register("store_phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Please enter a valid Turkish phone number"
                    }
                  })}
                  placeholder="5XX XXX XXXX"
                  className="mt-0 block w-full rounded-none rounded-r-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {errors.store_phone && <p className="mt-1 text-sm text-red-600">{errors.store_phone.message}</p>}
            </div>

            {/* Store Tax ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Tax ID</label>
              <input
                type="text"
                {...register("store_tax_no", {
                  required: "Tax ID is required",
                  pattern: {
                    value: /^T\d{4}V\d{6}$/,
                    message: "Tax ID must match pattern TXXXXVXXXXXX (X = number)"
                  }
                })}
                placeholder="TXXXXVXXXXXX"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.store_tax_no && <p className="mt-1 text-sm text-red-600">{errors.store_tax_no.message}</p>}
            </div>

            {/* Store Bank Account */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Bank Account (IBAN)</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  TR
                </span>
                <input
                  type="text"
                  {...register("store_bank_account", {
                    required: "IBAN is required",
                    pattern: {
                      value: /^\d{24}$/,
                      message: "Please enter a valid IBAN (24 digits)"
                    }
                  })}
                  placeholder="Enter 24 digits"
                  className="mt-0 block w-full rounded-none rounded-r-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              {errors.store_bank_account && <p className="mt-1 text-sm text-red-600">{errors.store_bank_account.message}</p>}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing up...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
