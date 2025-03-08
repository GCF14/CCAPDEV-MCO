import { useAuthContext } from '@/hooks/useAuthContext';
import { useState } from 'react';

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const { dispatch } = useAuthContext()
    const port = process.env.NEXT_PUBLIC_PORT


    const login = async (username: string, password: string) => {
        setIsLoading(true)
        setError(null)
        

        const response = await fetch(`http://localhost:${port}/api/users/login`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password}),
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

    return { login, error, isLoading }
}