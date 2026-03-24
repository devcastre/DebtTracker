'use client';
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

  const handleLogin = async () => {
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

  console.log("EMAIL RAW:", email);
  console.log("EMAIL JSON:", JSON.stringify(email));
  console.log("EMAIL LENGTH:", email.length);

  const handleSignup = async () => {
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

  console.log(typeof email)

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

      {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-3 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-3 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={isLogin ? handleLogin : handleSignup}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
      </button>

      <p className="mt-4 text-center text-gray-600">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-500 hover:underline"
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}