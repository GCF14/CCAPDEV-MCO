import { useAuthContext } from '@/hooks/useAuthContext';
import { useState } from 'react';

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()


    const signup = async (password: string, username: string, firstName: string, lastName: string, confirmPassword: string) => {
        setIsLoading(true)
        setError(null)
        

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password, username, firstName, lastName, confirmPassword}),
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return false;
        }

        if(response.ok) {
            
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})

            // store user in session storage
            sessionStorage.setItem('user', JSON.stringify(json));

            setIsLoading(false)
            return true;

        }
    }

    return { signup, error, isLoading }
}