import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const registerForm = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Login handler
  const onLoginSubmit = async (data: any) => {
    try {
      const res = await fetch('https://luxestorebackeend-1.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email, password: data.password }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Login failed');
      localStorage.setItem('luxe_jwt', result.token);
      localStorage.setItem('luxe_user', JSON.stringify(result.user));
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      window.location.href = '/';
    } catch (err: any) {
      toast({
        title: "Login failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  // Register handler
  const onRegisterSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    try {
      const res = await fetch('https://luxestorebackeend-1.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.name, email: data.email, password: data.password, confirmPassword: data.confirmPassword }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Registration failed');
      toast({
        title: "Account created!",
        description: "Welcome to LuxeStore. Your account has been created successfully.",
      });
      setIsLogin(true); // Switch to login form
    } catch (err: any) {
      toast({
        title: "Registration failed",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center mobile-padding">
      <div className="w-full max-w-md">
        {/* Logo/Brand Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary mr-2 animate-pulse" />
            <h1 className="text-3xl font-bold text-gradient">LuxeStore</h1>
          </div>
          <p className="text-white/70">
            {isLogin ? 'Welcome back to luxury' : 'Join the luxury experience'}
          </p>
        </div>

        {/* Main Auth Card */}
        <Card className="glass-card shadow-2xl border border-white/10">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl text-white">
              {isLogin ? 'Sign In' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-white/70">
              {isLogin 
                ? 'Enter your credentials to access your account' 
                : 'Fill in your information to get started'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Login Form */}
            {isLogin ? (
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                            <Input 
                              type="email" 
                              placeholder="Enter your email" 
                              className="glass-input-enhanced pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Enter your password" 
                              className="glass-input-enhanced pl-10 pr-10" 
                              {...field} 
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full btn-primary">
                    Sign In
                  </Button>
                </form>
              </Form>
            ) : (
              /* Register Form */
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-4">
                  <FormField
                    control={registerForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Full Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                            <Input 
                              placeholder="Enter your full name" 
                              className="glass-input-enhanced pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                            <Input 
                              type="email" 
                              placeholder="Enter your email" 
                              className="glass-input-enhanced pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                            <Input 
                              type={showPassword ? "text" : "password"} 
                              placeholder="Create a password" 
                              className="glass-input-enhanced pl-10 pr-10" 
                              {...field} 
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
                            <Input 
                              type="password" 
                              placeholder="Confirm your password" 
                              className="glass-input-enhanced pl-10" 
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full btn-primary">
                    Create Account
                  </Button>
                </form>
              </Form>
            )}

            {/* Toggle between Login/Register */}
            <div className="text-center pt-4 border-t border-white/10">
              <p className="text-white/70">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                {' '}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-white/50">
          <p>© 2024 LuxeStore. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
