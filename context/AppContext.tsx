// React/Next
import { createContext, useContext, useState, useEffect } from 'react';

// Types/Interfaces
import { cart, setCart } from '@/interfaces/cart';

interface IAppContext {
    cart: cart;
    setCart: setCart;
}

export const AppContext = createContext<IAppContext>({
    cart: [],
    setCart: (): void => {},
});

export function useCart(): IAppContext {
    const { cart, setCart } = useContext(AppContext);
    return { cart, setCart };
}

interface IAppProviderProps {
    children: React.ReactNode;
}

export const AppProvider: React.FC<IAppProviderProps> = ({
    children,
}): JSX.Element => {
    const [cart, setCart] = useState<cart>([]);

    // Get cart from storage
    useEffect((): void => {
        if (!cart.length) {
            const storedCart = localStorage.getItem('cart');
            if (storedCart) setCart(JSON.parse(storedCart));
        } else localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <AppContext.Provider value={{ cart, setCart }}>
            {children}
        </AppContext.Provider>
    );
};
