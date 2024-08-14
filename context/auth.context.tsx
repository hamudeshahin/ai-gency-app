import { LoginFormSchemaType } from "@/app/(auth)/login";
import { useStorageState } from "@/hooks/useStorageState";
import React, { useCallback, useEffect, useState } from "react";

// form interface
export interface User {
    email: string;
}

export type UserReturnProps = {
    access_token: string;
    user: User;
    message?: string;
    status?: boolean;
} | null;

const AuthContext = React.createContext<{
    signIn: (data: UserReturnProps) => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
    userData: User | null;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
    userData: null,
});

// fetch user details
export const fetchUserDetails = async (token: string) => {
    const response = await fetch(`http://localhost:8080/api/auth/${token}`);
    const data = await response.json();
    return data;
};

// create user api function
export const loginUser = async (
    data: LoginFormSchemaType
): Promise<{ data: UserReturnProps } | null> => {
    try {
        // loop through the data and append it to the form data
        const formData = new FormData();
        for (const key in data) {
            const value = (data as any)[key];
            formData.append(key, value);
        }

        const response = await fetch("https://aigency.dev/api/v1/login/", {
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "form-data",
            },
        });

        if (!response.ok) {
            throw new Error(String("Authentication failed"));
        }

        const user = await response.json();
        return {
            data: {
                ...user,
                email: data.email,
            },
        };
    } catch (err) {
        console.error("err");
        console.error(String(err));
        return null;
    }
};

// hook to use the auth context and access the user info
export function useSession() {
    const context = React.useContext(AuthContext);
    if (process.env.NODE_ENV !== "production") {
        if (!context) {
            throw new Error("useSession must be used within an AuthProvider");
        }
    }
    return context;
}

// provider to wrap the app with to provide the auth context
export function SessionProvider(props: React.PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState("session");

    const [userData, setUserData] = useState<User | null>(null);

    const signIn = (data: UserReturnProps) => {
        if (!data) {
            setSession(null);
            setUserData(null);
            return null;
        }

        setSession(data.access_token);
        setUserData({ email: data.user.email });
    };

    // useEffect(() => {
    //   if (session) {
    //     fetchUserDetails(session).then((data) => {
    //       signIn({
    //         user: {
    //           email: data.email,
    //           username: data.name,
    //         },
    //         access_token: session,
    //       });
    //     });
    //   }
    // }, [session]);

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signOut: () => {
                    // Perform the logout logic here
                    setSession(null);
                    setUserData(null);
                },
                session,
                isLoading,
                userData,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
