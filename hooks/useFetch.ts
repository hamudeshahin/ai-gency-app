import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";

type UseFetchProps = {
    callApiFunc: (props: any) => Promise<any>;
    callOnMount?: boolean;
    params?: any;
    onSuccess?: (data: any) => void;
};

const useFetch = (props: UseFetchProps) => {
    // extract props
    const { callApiFunc, callOnMount = false, params = {}, onSuccess } = props;

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    // get fetch function and call it here
    const fetchData = async (props: any) => {
        setIsLoading(true);
        try {
            const response = await callApiFunc(props);
            console.log("response");
            console.log(response);

            if (response.status === false) {
                setError(response?.message || "Something went wrong.");
                return;
            }
            setData(response);
            onSuccess?.(response);
        } catch (error) {
            setError(String(error));
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (callOnMount) {
                fetchData(params);
            }
            return () => {};
        }, [callOnMount, callApiFunc])
    );

    return {
        isLoading,
        error,
        data,
        fetchData,
    };
};

export default useFetch;
