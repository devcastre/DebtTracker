'use client'



import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/app/lib/supabase';


export default function LogIn() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  const cleanEmail = email.trim().toLowerCase();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email: cleanEmail, 
      password 
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }


    router.replace('/dashboard');
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    const { data, error } = await supabase.auth.signUp({ 
      email: cleanEmail, 
      password 
    });
    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    alert('Signup successful! Please check your email for confirmation.');
    setIsLogin(true);
  };



  return (
    <div className="p-6 w-full max-w-md mx-auto bg-white shadow-lg rounded-md mt-20">
      <h2 className="text-3xl text-(--primaryColor) font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>

      {errorMsg && <p className="text-red-500 mb-4 text-center">{errorMsg}</p>}

      <form className="flex flex-col gap-5" onSubmit={isLogin ? handleLogin : handleSignup}>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2">
          <label htmlFor="email" className="mb-1 text-base font-medium text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-(--tertiaryColor) focus:shadow-md"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2">
          <label htmlFor="password" className="mb-1 text-base font-medium text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-4 text-base text-gray-700 outline-none focus:border-(--tertiaryColor) focus:shadow-md"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-(--primaryColor) text-white hover:text-(--primaryColor) py-3 rounded-md hover:bg-(--tertiaryColor) transition-colors duration-200 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.75)]"
        >
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p className="text-center text-gray-600 mt-2">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-(--primaryColor) hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}