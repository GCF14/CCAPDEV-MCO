import { useAuthContext } from '@/hooks/useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const port = process.env.NEXT_PUBLIC_PORT

    const logout = async () => {

        try {
            console.log("Before logout:", sessionStorage.getItem('user')); // Debugging
            sessionStorage.removeItem('user');
            console.log("After removeItem:", sessionStorage.getItem('user'));

            sessionStorage.clear()
            console.log("After clear:", sessionStorage.getItem('user'));

            dispatch({type: 'LOGOUT'})
            
        } catch (error) {
            console.error("Logout failed:", error);
        }

    }

    return { logout }
}