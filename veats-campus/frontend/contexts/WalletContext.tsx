// Order@Ease — Wallet Context (SRM-Coin balance)
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface WalletCtx {
    balance: number;
    addCoins: (amount: number) => void;
    spendCoins: (amount: number) => boolean;
}

const WalletContext = createContext<WalletCtx>({
    balance: 120,
    addCoins: () => { },
    spendCoins: () => false,
});

export function WalletProvider({ children }: { children: ReactNode }) {
    const [balance, setBalance] = useState(120);

    useEffect(() => {
        const saved = localStorage.getItem('oe_srm_coin');
        if (saved) setBalance(parseInt(saved, 10));
    }, []);

    const saveBalance = (b: number) => {
        setBalance(b);
        localStorage.setItem('oe_srm_coin', String(b));
    };

    const addCoins = (amount: number) => saveBalance(balance + amount);

    const spendCoins = (amount: number): boolean => {
        if (balance >= amount) {
            saveBalance(balance - amount);
            return true;
        }
        return false;
    };

    return (
        <WalletContext.Provider value={{ balance, addCoins, spendCoins }}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => useContext(WalletContext);
