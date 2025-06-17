import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuarioId, setUsuarioId] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  return (
    <UserContext.Provider value={{ usuarioId, setUsuarioId, nome, setNome, email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};
