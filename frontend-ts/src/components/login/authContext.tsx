// authContext.tsx

import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { User } from './User';

type State = {
    user: User | null;
    isAuthenticated: boolean;
};

type Action = 
    | { type: 'LOGIN', payload: User }
    | { type: 'LOGOUT' };

const UserContext = createContext<{ state: State, dispatch: React.Dispatch<Action> } | undefined>(undefined);

const userReducer = (state: State, action: Action): State => {
    switch(action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload, isAuthenticated: true };
        case 'LOGOUT':
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};

type UserProviderProps = {
    children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, { user: null, isAuthenticated: false });
    return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a UserProvider');
    }
    return context;
};
