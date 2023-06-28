import { createContext, useContext, useState, useEffect } from 'react';
import { cart } from '@/interfaces/cart';

interface IAppContext {
    cart: cart;
    setCart: React.Dispatch<React.SetStateAction<cart>>;
}

export const AppContext = createContext<IAppContext>({
    cart: [],
    setCart: () => {},
});

export function useCart() {
    const { cart, setCart } = useContext(AppContext);
    return { cart, setCart };
}

interface IAppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: React.FC<IAppProviderProps> = ({ children }) => {
    const [cart, setCart] = useState<cart>([]);

    // Get cart from storage
    useEffect(() => {
        if (!cart.length) {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) setCart(JSON.parse(storedCart));
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    return (
        <AppContext.Provider value={{ cart, setCart }}>
            {children}
        </AppContext.Provider>
    );
};
