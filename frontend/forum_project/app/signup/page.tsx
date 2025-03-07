'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff} from 'lucide-react'
import Link from 'next/link'
import { useSignup } from '@/hooks/useSignup'
import { useRouter } from "next/navigation";

export default function Login() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const { signup, error, isLoading } = useSignup()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const success = await signup(password, username, firstName, lastName)

    if (success) {
      // redirect to home page
      router.push('/')

    }

  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" w-full max-w-lg"
      >
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter">Sign-up</h1>
            <p className="text-muted-foreground">Enter your credentials to register an account</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
                <div className="w-full">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    />
                </div>

                <div className="w-full">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    />
                </div>
            </div>

          
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
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
            <Button type="submit" className="w-full" disabled={isLoading}>Sign-up</Button>
          </form>
          <div className="text-center mt-4">
            <p className="text-muted-foreground">Already have an account?</p>
            <Link
              href="/login" 
              className="text-primary-500 hover:underline"
            >
              Login
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
