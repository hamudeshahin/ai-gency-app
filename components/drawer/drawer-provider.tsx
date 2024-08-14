// drawer provider to make custom drawer component
// and provide it to the whole app
// also provide the drawer's state and methods to open and close it

import React, { createContext, useCallback, useState } from "react";

export const DrawerContext = createContext({
    isOpen: false,
    openDrawer: () => {},
    closeDrawer: () => {},
});

type DrawerProviderProps = {
    children: React.ReactNode;
};

export const DrawerProvider = ({ children }: DrawerProviderProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openDrawer = useCallback(() => {
        setIsOpen(true);
    }, []);

    const closeDrawer = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
            {children}
        </DrawerContext.Provider>
    );
};

// useDrawer hook to use the drawer's state and methods
export const useDrawer = () => React.useContext(DrawerContext);
