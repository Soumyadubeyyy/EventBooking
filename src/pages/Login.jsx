import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate('/');
    } catch (error) {
      // Handled by AuthContext toast
    }
  };

  return (
    <div className="flex justify-center items-center py-16 md:py-24">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="border-violet-100 dark:border-violet-900/40 shadow-xl shadow-violet-200/40 dark:shadow-violet-950/30">
          <CardHeader className="pt-10 pb-2 text-center">
            <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-violet-100 dark:bg-violet-900/40 flex items-center justify-center">
              <LogIn className="h-6 w-6 text-violet-700 dark:text-violet-400" />
            </div>
            <CardTitle className="text-2xl font-extrabold text-violet-950 dark:text-white">Welcome Back</CardTitle>
            <p className="text-violet-500 dark:text-violet-500 mt-1.5 text-sm">Log in to manage your bookings</p>
          </CardHeader>
          <CardContent className="px-8 pb-10 pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input label="Email Address" type="email" placeholder="you@example.com" {...register('email')} error={errors.email?.message} />
              <Input label="Password" type="password" placeholder="••••••••" {...register('password')} error={errors.password?.message} />
              <Button type="submit" variant="primary" className="w-full h-11 text-base" isLoading={isSubmitting}>
                Log in
              </Button>
            </form>
            <div className="mt-8 text-center text-sm text-violet-600 dark:text-violet-500 bg-violet-50 dark:bg-violet-900/20 py-3.5 rounded-xl border border-violet-100 dark:border-violet-900/30">
              Don't have an account?{' '}
              <Link to="/register" className="text-violet-900 dark:text-violet-300 hover:text-violet-700 font-bold underline underline-offset-2">
                Sign up free
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
