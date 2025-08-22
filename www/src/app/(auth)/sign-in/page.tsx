'use client';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { signInForm, SignInForm } from '@/lib/validators';
import { signIn } from '@/lib/actions';

export default function SignIn() {
  const { register, handleSubmit } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  function onSubmit(data: SignInForm) {
    return signIn(data);
  }

  return (
    <div className="flex items-center bg-slate-950 justify-center min-h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-fit p-8 rounded-md border border-gray-300/30"
      >
        <input
          placeholder="Email"
          className="border border-gray-300/30 bg-slate-900 min-w-[30rem] rounded-md px-4 py-2 "
          {...register('email')}
        />

        <input
          placeholder="Password"
          className="border border-gray-300/30 bg-slate-900 min-w-[30rem] rounded-md px-4 py-2 "
          {...register('password')}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
