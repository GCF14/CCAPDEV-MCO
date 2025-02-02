'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail} from 'lucide-react'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);


  return (
    <head>
        <title>Login</title>
        <meta name="description" content="Login" />
    </head>
    
    
    
  );
}
