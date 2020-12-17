import { createContext } from 'react';
import { ContextValue } from './types';

export const InjectorContext = createContext<ContextValue>({});
