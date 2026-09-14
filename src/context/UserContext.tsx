/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type PersonalData } from "../features/profilePage/profileData";
import { shopifyLogin, shopifyRegister, shopifyForgotPassword, shopifyResetPassword, shopifyGetCustomer } from "../data/shopifyAuth";

export type UserProfile = PersonalData & {
  isAuthenticated: boolean;
  shopifyCustomerId?: string;
};

export type UserContextValue = {
  user: UserProfile | null;
  isLoading: boolean;
  authError: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (id: string, token: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<PersonalData>) => void;
  clearAuthError: () => void;
};

const UserContext = createContext<UserContextValue | null>(null);

// Helper to load user data from localStorage
const loadUserFromStorage = (email: string): PersonalData | null => {
  try {
    const stored = localStorage.getItem(`user_${email}`);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

// Helper to save user data to localStorage
const saveUserToStorage = (email: string, data: PersonalData) => {
  try {
    localStorage.setItem(`user_${email}`, JSON.stringify(data));
  } catch {
    console.error("Failed to save user data to localStorage");
  }
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    // Check for existing session on mount
    const initSession = async () => {
      const token = localStorage.getItem("shopify_access_token");
      if (token) {
        try {
          setIsLoading(true);
          const customer = await shopifyGetCustomer(token);
          if (customer) {
            const email = customer.email;
            // Try to load saved user data, otherwise create new profile
            const savedData = loadUserFromStorage(email);
            const profileData: PersonalData = savedData || {
              name: `${customer.firstName} ${customer.lastName}`.trim() || "",
              email: email,
              phoneNumber: customer.phone || "",
              addresses: [],
              orders: [],
            };
            
            setUser({
              ...profileData,
              shopifyCustomerId: customer.id,
              isAuthenticated: true,
            });
          } else {
            // Token is likely invalid or expired
            localStorage.removeItem("shopify_access_token");
          }
        } catch (error) {
          console.error("Failed to restore session:", error);
          localStorage.removeItem("shopify_access_token");
        } finally {
          setIsLoading(false);
        }
      }
    };
    initSession();
  }, []);

  const clearAuthError = () => setAuthError(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const tokenObj = await shopifyLogin(email, password);
      localStorage.setItem("shopify_access_token", tokenObj.accessToken);
      
      const customer = await shopifyGetCustomer(tokenObj.accessToken);
      
      // Load or create user data
      const savedData = loadUserFromStorage(email);
      const profileData: PersonalData = savedData || {
        name: `${customer.firstName} ${customer.lastName}`.trim() || email,
        email: customer.email,
        phoneNumber: customer.phone || "",
        addresses: [],
        orders: [],
      };
      
      // Save to localStorage
      saveUserToStorage(email, profileData);
      
      setUser({
        ...profileData,
        shopifyCustomerId: customer.id,
        isAuthenticated: true,
      });
    } catch (error: any) {
      setAuthError(error.message || "Failed to login");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      // Split name into first and last name
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      const tokenObj = await shopifyRegister(firstName, lastName, email, password);
      localStorage.setItem("shopify_access_token", tokenObj.accessToken);

      // Create new user data
      const profileData: PersonalData = {
        name: name || email,
        email,
        phoneNumber: "",
        addresses: [],
        orders: [],
      };
      
      // Save to localStorage
      saveUserToStorage(email, profileData);

      setUser({
        ...profileData,
        isAuthenticated: true,
      });
    } catch (error: any) {
      setAuthError(error.message || "Failed to register");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await shopifyForgotPassword(email);
    } catch (error: any) {
      setAuthError(error.message || "Failed to initiate password reset");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (id: string, token: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const tokenObj = await shopifyResetPassword(id, token, password);
      if (tokenObj && tokenObj.accessToken) {
        localStorage.setItem("shopify_access_token", tokenObj.accessToken);
        const customer = await shopifyGetCustomer(tokenObj.accessToken);
        
        const savedData = loadUserFromStorage(customer.email);
        const profileData: PersonalData = savedData || {
          name: `${customer.firstName} ${customer.lastName}`.trim() || customer.email,
          email: customer.email,
          phoneNumber: customer.phone || "",
          addresses: [],
          orders: [],
        };
        
        saveUserToStorage(customer.email, profileData);
        
        setUser({
          ...profileData,
          shopifyCustomerId: customer.id,
          isAuthenticated: true,
        });
      }
    } catch (error: any) {
      setAuthError(error.message || "Failed to reset password");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("shopify_access_token");
    setUser(null);
  };

  const updateProfile = (profile: Partial<PersonalData>) => {
    setUser((current) => {
      if (!current) return current;
      
      const updated = {
        ...current,
        ...profile,
      };
      
      // Save to localStorage with user's email as key
      saveUserToStorage(updated.email, {
        name: updated.name,
        email: updated.email,
        phoneNumber: updated.phoneNumber,
        addresses: updated.addresses,
        orders: updated.orders || [],
      });
      
      return updated;
    });
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoading, 
      authError, 
      login, 
      register, 
      forgotPassword, 
      resetPassword,
      logout, 
      updateProfile, 
      clearAuthError 
    }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
