import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );

  const login = (email, password) => {
    // Check credentials
    if (email === "Admin@example" && password === "admin@12") {
      const user = {
        id: 1,
        name: "Admin User",
        email: email,
        profilePic:
          "https://images.pexels.com/photos/3228727/pexels-photo-3228727.jpeg?auto=compress&cs=tinysrgb&w=1600",
      };
      setcurrentUser(user);
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  };

  const logout = () => {
    setcurrentUser(false);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
