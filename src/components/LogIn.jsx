'use client'



import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient} from '@/src/lib/client';


export default function LogIn() {

  const supabase = createClient();
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [signupComplete, setSignupComplete] = useState(false);


  const cleanEmail = email.trim().toLowerCase();


  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setErrorMsg('');

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      });

      if (error) {
        setErrorMsg('Invalid email or password.');
        return;
      }

      router.replace('/dashboard');
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const handleSignup = async (e) => {
    e.preventDefault();

    if (loading) return;

    setErrorMsg('');
    setSuccessMsg('');
    setSignupComplete(false);

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
      });

      if (error) {
        setErrorMsg(
          'Unable to create your account. Please check your details and try again.'
        );
        return;
        }

        if (data.session) {
          setSuccessMsg('Your account has been created successfully!');
          setSignupComplete(true);
          setPassword('');
        } else if (data.user) {
          setSuccessMsg(
            'Account created. Please log in to continue.'
          );
          setSignupComplete(false);
          setPassword('');
        } else {
          setErrorMsg('Unable to confirm account creation. Please try again.');
        }
      } catch {
        setErrorMsg('Unable to create your account. Please try again.');
      } finally {
        setLoading(false);
      }
  };


  return (
    <div className='p-6 w-full max-w-md mx-auto bg-white shadow-lg rounded-sm mt-20'>
      <h2 className='text-3xl text-(--primaryColor) font-bold mb-6'>{isLogin ? 'Login' : 'Sign Up'}</h2>

      <form className='flex flex-col gap-5' onSubmit={isLogin ? handleLogin : handleSignup}>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
          <label htmlFor='email' className='mb-1 text-base font-medium text-gray-700'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='you@example.com'
            required
            className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#34373e] outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
          <label htmlFor='password' className='mb-1 text-base font-medium text-gray-700'>
            Password:
          </label>
          <input
            type='password'
            id='password'
            autoComplete={isLogin ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='••••••••'
            required
            className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#34373e] outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)]'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-(--primaryColor) text-white py-3 rounded-sm hover:bg-(--secondaryColor) transition-colors duration-200 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.75)]'
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className='text-center text-gray-600 mt-2'>
          {isLogin ? 'Don`t have an account?' : 'Already have an account?'}{' '}
          <button
            type='button'
            onClick={() => {
              setIsLogin(!isLogin);
              setErrorMsg('');
              setSuccessMsg('');
              setSignupComplete(false);
            }}
            className='text-(--primaryColor) hover:underline'
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>


        {successMsg && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-sm rounded-md border border-(--secondaryColor) bg-white p-6 text-center shadow-xl">
              <div className="mb-3 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-8 w-8 text-(--primaryColor)"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="mb-2 text-xl font-bold text-(--primaryColor)">
                Success!
              </h3>

              <p role="status" className="mb-6 text-sm text-gray-600">
                {successMsg}
              </p>

              {signupComplete && (
                <button
                  type="button"
                  onClick={() => router.replace('/dashboard')}
                  className="w-full rounded-sm bg-(--primaryColor) px-5 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-(--secondaryColor)"
                >
                  Continue to Dashboard
                </button>
              )}
            </div>
          </div>
        )}



        {errorMsg && (
          <div
            onClick={() => setErrorMsg('')}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-md border border-red-200 bg-white p-5 text-center shadow-lg"
            >
              <p className="mb-2 text-xl font-bold text-red-600">
                Something went wrong
              </p>

              <p role="alert" className="text-sm text-gray-600">
                {errorMsg}
              </p>
            </div>
          </div>
        )}


      </form>
    </div>
  );
}