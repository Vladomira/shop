import {
   createContext,
   useContext,
   FC,
   useState,
   PropsWithChildren,
} from "react";

interface Auth {
   user: {} | null;
}

const AuthContext = createContext<Auth>({ user: null });

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
   const [user, setUser] = useState<{} | null>(null);

   return (
      <AuthContext.Provider
         value={{
            user,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};
export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
