import { createContext, useContext, useEffect, useState } from "react";
import { checkLoginStatus } from "../apis/accounts";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    // 로그인 상태 즉시 업데이트 함수
    const updateLoginStatus = async () => {
        const status = await checkLoginStatus();
        console.log("🔄 로그인 상태 업데이트:", status);
        setIsLoggedIn(status);
    };

    useEffect(() => {
        updateLoginStatus(); //초기 실행 시 로그인 상태 확인
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, updateLoginStatus }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
