'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import ky from 'ky';
import { User } from '@/lib/types';
import { useRouter } from 'next/navigation';

const signUpForm = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(8),
});

type SignUpForm = z.infer<typeof signUpForm>;

async function signUp(data: SignUpForm): Promise<User> {
  return await ky
    .post('http://abhomies-backend-1:8070/register', {
      json: data,
    })
    .json<User>();
}

export default function SignUpPage() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignUpForm>({
    resolver: zodResolver(signUpForm),
  });

  const { mutate } = useMutation({
    mutationFn: signUp,
    onSuccess: () => router.push('/sign-in'),
    onError: (error) => console.error(error),
  });

  function onSubmit(data: SignUpForm) {
    mutate(data);
  }
  return (
    <div className="flex items-center bg-slate-950 justify-center min-h-screen">
      <form
        className="flex flex-col gap-4 h-fit p-8 rounded-md border border-gray-300/30"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          placeholder="Email"
          className="border border-gray-300/30 bg-slate-900 min-w-[30rem] rounded-md px-4 py-2 "
          {...register('email')}
        />
        <input
          placeholder="Name"
          className="border border-gray-300/30 bg-slate-900 min-w-[30rem] rounded-md px-4 py-2 "
          {...register('name')}
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
