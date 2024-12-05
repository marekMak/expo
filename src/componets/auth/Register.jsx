import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { registerUser } from '../../lib/pocketbase';

const registerSchema = z
  .object({
    email: z.string().email('Not valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

const Register = () => {
  const { register, handleSubmit, formState } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  async function onSubmit(data) {
    try {
      const { registerData } = await registerUser(
        data.email,
        data.password,
        data.confirmPassword
      );
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Error registering in:', error);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center  bg-base-100 w-96 shadow-xl py-10">
      <h2 className="text-xl font-bold font-amsterdam mb-6 text-center text-baseTeal">
        Create an account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="email"
              id="email"
              {...register('email')}
              placeholder="enter your email address"
              className="grow"
            />
            {formState.errors.email && (
              <p className="error">{formState.errors.email.message}</p>
            )}
          </label>
        </div>
        <div className="my-5">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              id="password"
              type="password"
              {...register('password')}
              placeholder="enter your password"
              className="grow"
            />
          </label>
          {formState.errors.password && (
            <p className="error">{formState.errors.password.message}</p>
          )}
        </div>
        <div className="mb-5">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="confirm your password"
              className="grow"
            />
          </label>
          {formState.errors.confirmPassword && (
            <p className="error">{formState.errors.confirmPassword.message}</p>
          )}
        </div>
        <button
          className="btn btn-outline btn-accent text-xl w-full"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="text-center mt-6 text-sm flex items-center">
        Already have an account?{' '}
        <Link
          to="/login"
          className="text-md font-bold text-baseTeal ml-2 text-xl delay-150 hover:text-baseGreen transition-colors"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default Register;