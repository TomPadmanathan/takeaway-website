import { createContext, useContext, useState } from 'react';

interface IAppContext {
    cart: { [key: string]: any };
    setCart: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
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
    const [cart, setCart] = useState<{ [key: string]: any }>([]);

    return (
        <AppContext.Provider value={{ cart, setCart }}>
            {children}
        </AppContext.Provider>
    );
};