import { useState, useEffect} from 'react';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<Boolean>(false)

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            setIsAuthenticated(true)
        }
    }, [])

    return isAuthenticated;
}