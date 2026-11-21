'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/src/lib/client';

export default function ForgotPassword() {
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setSuccessMsg('');
    setErrorMsg('');

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      setErrorMsg('Please enter your email address.');
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        setErrorMsg(
          error.status === 429
            ? 'Too many attempts. Please wait a few minutes and try again.'
            : 'Unable to send the recovery email. Please try again later.'
        );
        return;
      }

      setSuccessMsg(
        'If an account exists with this email, you will receive a password recovery link. Please check your inbox.'
      );
      setEmail('');
    } catch {
      setErrorMsg('Something went wrong. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='w-full h-dvh flex items-center justify-center'>
      <div className='p-6 h-fit w-fit m-auto bg-white shadow-lg rounded-sm'>
        <h2 className='text-3xl text-(--primaryColor) font-bold mb-2'>Forgot Password?</h2>

        <p className='text-base text-gray-600 mb-6'>
          Enter your registered email address and we will send you a password recovery link.
        </p>

        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-[1fr_4fr] items-center gap-2'>
            <label htmlFor='email' className='mb-1 text-base font-medium text-gray-700'>
              Email:
            </label>
            <input
              type='email'
              id='email'
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='you@example.com'
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
            {loading ? 'Please wait...' : 'Send Recovery Link'}
          </button>

          <p className='text-center text-gray-600 mt-2'>
            Remember your password?{' '}
            <Link href='/' className='text-(--primaryColor) hover:underline'>
              Login
            </Link>
          </p>

          {successMsg && (
            <div
              onClick={() => setSuccessMsg('')}
              className='fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4'
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className='w-full max-w-sm rounded-md border border-(--secondaryColor) bg-white p-6 text-center shadow-xl'
              >
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

                <h3 className='mb-2 text-xl font-bold text-(--primaryColor)'>Check your email</h3>

                <p role='status' className='mb-6 text-sm text-gray-600'>
                  {successMsg}
                </p>

                <button
                  type='button'
                  onClick={() => setSuccessMsg('')}
                  className='w-full rounded-sm bg-(--primaryColor) px-5 py-3 font-semibold text-white shadow-md transition-colors duration-200 hover:bg-(--secondaryColor)'
                >
                  Close
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
    </main>
  );
}