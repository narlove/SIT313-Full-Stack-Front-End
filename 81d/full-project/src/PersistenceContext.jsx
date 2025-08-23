import { createContext, useContext, useMemo } from 'react';
import { PersistenceLayer } from './persistenceLayer.js';

const PersistenceContext = createContext(null);

export function PersistenceProvider({ children }) {
    const persistenceLayer = useMemo(() => new PersistenceLayer(), []);
    
    return (
        <PersistenceContext.Provider value={persistenceLayer}>
            {children}
        </PersistenceContext.Provider>
    );
}

// react best practice
export function usePersistence() {
    const context = useContext(PersistenceContext);
    
    if (!context) {
        throw new Error('usePersistence must be used within a PersistenceProvider');
    }
    
    return context;
}
