import { ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
    id: number,
    description: string,
    type: 'income' | 'outcome',
    category: string,
    price: number,
    createdAt: Date
}

interface CreateTransactionInput {
    description: string,
    type: 'income' | 'outcome',
    category: string,
    price: number,
}

interface TransactionsContextType {
    transactions: Transaction[];
    createTransaction: (newTransaction: CreateTransactionInput) => void,
    fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProviderProps {
    children: ReactNode
}

export const TransactionsContext = createContext<TransactionsContextType>({} as TransactionsContextType);

export function TransactionsProvider({children}: TransactionsProviderProps){
    const [transactions, setTransactions] = useState<Transaction[]>([])
    
    const createTransaction = useCallback(
        async (newTransaction: CreateTransactionInput) => {
            const { description, category, price, type } = newTransaction;

            const response = await api.post("transactions", {
                description,
                category,
                price,
                type,
                createdAt: new Date(),
            })

            setTransactions((state) => {
                return [
                    response.data,
                    ...state
                ]
            })
        },
        []
    )

    const fetchTransactions = useCallback(
        async(query?: string) => {
            const response = await api.get('transactions', {
                params: {
                    q: query,
                    _sort: "createdAt",
                    _order: 'desc'
                }
            })

            setTransactions(response.data);
        },
        []
    )

    useEffect(() => {
        fetchTransactions();
    }, [])
    
    return(
        <TransactionsContext.Provider value={{
            transactions,
            createTransaction,
            fetchTransactions
        }}>
            {children}
        </TransactionsContext.Provider>
    )
}