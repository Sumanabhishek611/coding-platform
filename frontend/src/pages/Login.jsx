import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import {z} from "zod"

const LoginSchema = z.object({
  
  emailId: z.string().email("Invalid Email"),
  password: z.string().min(8, "Password is to weak")

})

function Login(){
     const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(LoginSchema) });

  const onSubmit = (data) => {
    console.log(data);
    
  }
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        
        <div className="card-body">
          
          <h2 className="text-3xl font-bold text-center mb-6">
           Login into your account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>

          
           

            {/* Email */}
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                placeholder="Enter email"
                className="input input-bordered w-full"
                {...register("emailId", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
              />

              {errors.emailId && (
               <span className="text-error">
                {errors.emailId.message}
               </span>
              )}
            </div>

            {/* Password */}
            <div className="form-control mb-2">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter password"
                className="input input-bordered w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters required",
                  },
                })}
              />

              {errors.password && (
                <span className="text-error">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Signup Button */}
            <div className="form-control mt-6 flex justify-center">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>

          </form>

          {/* Login Link */}
          <p className="text-center mt-4 text-sm">
            Already have an account?{" "}
            <a href="/signup" className="link link-primary">
              Sign Up
            </a>
          </p>

        </div>
      </div>
    </div>
    )
}
export default Login