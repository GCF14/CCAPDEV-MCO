import { useAuthContext } from '@/hooks/useAuthContext';

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    

    const logout = async () => {

        try {
            console.log("Before logout:", sessionStorage.getItem('user')); // Debugging
            sessionStorage.removeItem('user');
            console.log("After removeItem:", sessionStorage.getItem('user'));

            sessionStorage.clear()
            console.log("After clear:", sessionStorage.getItem('user'));

            localStorage.removeItem('password')
            const removeCookie = (name: string) => {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
            };

            removeCookie('rememberMe');
            removeCookie('username');

            console.log("Cookies cleared");

            dispatch({type: 'LOGOUT'})
            
        } catch (error) {
            console.error("Logout failed:", error);
        }

    }

    return { logout }
}