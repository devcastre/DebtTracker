'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/src/lib/client';

export default function ResetPassword() {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();

  
  const [linkStatus, setLinkStatus] = useState('checking');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let active = true;

    async function verifyLink() {
      
      const urlText = window.location.search + window.location.hash;
      if (urlText.includes('error=') || urlText.includes('error_code=')) {
        if (active) setLinkStatus('invalid');
        return;
      }


      const { data } = await supabase.auth.getSession();
      if (active) setLinkStatus(data.session ? 'valid' : 'invalid');
    }

    verifyLink();

    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY' && active) setLinkStatus('valid');
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setErrorMsg('');
    setSuccessMsg('');

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        setErrorMsg(
          error.code === 'same_password'
            ? 'Your new password must be different from your current password.'
            : error.code === 'weak_password'
            ? 'This password is too weak. Please choose a stronger one.'
            : 'Unable to update your password. Please request a new reset link and try again.'
        );
        return;
      }

      
      await supabase.auth.signOut();

      setPassword('');
      setConfirmPassword('');
      setSuccessMsg('Your password has been updated. You can now log in with your new password.');
    } catch {
      setErrorMsg('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (linkStatus === 'checking') {
    return (
      <div className='p-6 w-full max-w-md mx-auto bg-white shadow-lg rounded-sm mt-20'>
        <h2 className='text-3xl text-(--primaryColor) font-bold mb-2'>Reset Password</h2>
        <p role='status' className='text-base text-gray-600'>
          Verifying your reset link...
        </p>
      </div>
    );
  }

  if (linkStatus === 'invalid') {
    return (
      <div className='p-6 w-full max-w-md mx-auto bg-white shadow-lg rounded-sm mt-20'>
        <h2 className='text-3xl text-red-600 font-bold mb-2'>Link expired</h2>
        <p role='alert' className='text-base text-gray-600 mb-6'>
          This reset link is invalid or has expired. Request a new one to continue.
        </p>
        <Link
          href='/forgot-password'
          className='block w-full bg-(--primaryColor) text-white text-center py-3 rounded-sm hover:bg-(--secondaryColor) transition-colors duration-200 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.75)]'
        >
          Request New Link
        </Link>
      </div>
    );
  }

  return (
    <div className='p-6 w-full max-w-md mx-auto bg-white shadow-lg rounded-sm mt-20'>
      <h2 className='text-3xl text-(--primaryColor) font-bold mb-2'>Reset Password</h2>

      <p className='text-base text-gray-600 mb-6'>
        Choose a new password for your account. It must be at least 8 characters.
      </p>

      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
          <label htmlFor='password' className='mb-1 text-base font-medium text-gray-700'>
            New:
          </label>
          <input
            type='password'
            id='password'
            autoComplete='new-password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='••••••••'
            required
            disabled={loading}
            className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#34373e] outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)] disabled:opacity-60'
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
          <label htmlFor='confirmPassword' className='mb-1 text-base font-medium text-gray-700'>
            Confirm:
          </label>
          <input
            type='password'
            id='confirmPassword'
            autoComplete='new-password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='••••••••'
            required
            disabled={loading}
            className='w-full bg-(--background) rounded-sm border border-[#e0e0e0] py-3 px-6 text-base font-medium text-[#34373e] outline-none shadow-[inset_3px_3px_2px_0_rgba(0,0,0,0.25)] disabled:opacity-60'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-(--primaryColor) text-white py-3 rounded-sm hover:bg-(--secondaryColor) transition-colors duration-200 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.75)] disabled:opacity-60'
        >
          {loading ? 'Please wait...' : 'Update Password'}
        </button>

        {successMsg && (
          <div className='fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4'>
            <div className='w-full max-w-sm rounded-md border border-(--secondaryColor) bg-white p-6 text-center shadow-xl'>
              <div className='mb-3 flex justify-center'>
                <div className='flex h-14 w-14 items-center justify-center rounded-full bg-teal-50'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={2}
                    stroke='currentColor'
                    className='h-8 w-8 text-(--primaryColor)'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='m4.5 12.75 6 6 9-13.5'
                    />
                  </svg>
                </div>
              </div>

              <h3 className='mb-2 text-xl font-bold text-(--primaryColor)'>Password updated</h3>

              <p role='status' className='mb-6 text-sm text-gray-600'>
                {successMsg}
              </p>

              <button
                type='button'
                onClick={() => router.replace('/')}
                className='w-full rounded-sm bg-(--primaryColor) px-5 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-(--secondaryColor)'
              >
                Go to Login
              </button>
            </div>
          </div>
        )}

        {errorMsg && (
          <div
            onClick={() => setErrorMsg('')}
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className='w-full max-w-sm rounded-md border border-red-200 bg-white p-5 text-center shadow-lg'
            >
              <p className='mb-2 text-xl font-bold text-red-600'>Something went wrong</p>

              <p role='alert' className='text-sm text-gray-600'>
                {errorMsg}
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}