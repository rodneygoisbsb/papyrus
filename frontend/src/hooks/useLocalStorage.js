import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
    // 1. Leitura inicial com Lazy Initialization (executa apenas na montagem)
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Erro ao ler a chave "${key}" do localStorage:`, error);
            return initialValue;
        }
    });

    // 2. Gravação automática sempre que a chave ou o valor mudarem
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.warn(`Erro.  agravar a chave "${key}" no localStorage:`, error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}