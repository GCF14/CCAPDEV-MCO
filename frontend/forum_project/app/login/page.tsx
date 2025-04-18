'use client'

import { useState, useEffect } from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff} from 'lucide-react'
import Link from 'next/link'
import { useLogin } from "@/hooks/useLogin"
import { useRouter } from "next/navigation";

function setCookie(name: string, value: string, days: number): void {
  const date: Date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${date.toUTCString()}; path=/`
}

function removeCookie(name: string): void {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

function getCookie(name: string): string | null {
  const nameEq = name + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.startsWith(nameEq)) {
      return cookie.substring(nameEq.length);
    }
  }
  return null;
}


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { login, error, isLoading } = useLogin()
  const router = useRouter() 

  useEffect(() => {
    const remembered = getCookie("rememberMe");
    const storedUsername = getCookie("username");
    const storedPassword = localStorage.getItem("password");

    if (remembered === 'true' && storedUsername && storedPassword) {
      (async () => {
        const success = await login(storedUsername, storedPassword);
        if (success) {
          router.push('/')
        }
      })();
    }
  }, [login, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await login(username, password);

    if (success) { 
      if (rememberMe) {
        setCookie("rememberMe", "true", 21); 
        setCookie("username", username, 21); 
        localStorage.setItem('password', password);
      } else {
        setCookie("rememberMe", "false", 1); // Clear quickly
        removeCookie('username');
        localStorage.removeItem('password');
      }
      router.push("/");;
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" w-full max-w-md"
      >
        <div className="bg-card dark:border-2 dark:border-secondary rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">Login</h1>
            <p className="text-muted-foreground">Enter your credentials to login to your account</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />

            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  />
                  <button 
                  type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)} />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <a href="#" className="text-primary-500 hover:underline">Forgot password?</a>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>Login</Button>
          </form>
          {error && (
            <div className="text-center text-sm text-red-500 mt-2">
              {error}
            </div>
          )}
          <div className="text-center mt-4">
            <p className="text-muted-foreground">Don&apos;t have an account?</p>
            <Link
              href="/signup" 
              className="text-primary-500 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
        <div className="text-center text-xs text-muted-foreground mt-4 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
          By clicking continue, you agree to our <br /> 
          <a href="#" className="mr-2">Terms of Service</a> and 
          <a href="#" className="ml-2">Privacy Policy</a>.
        </div>

        

      </motion.div>
      

    </div>
    
    
  );
}
