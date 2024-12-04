import React from "react";

export default function fetchHook(url: string) {
    const [data, setData] = React.useState(null);
    const [errors, setErrors] = React.useState<Error | null>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const fetchData = async (url: string) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = await response.json();
            setData(json);
        } catch (error) {
            setErrors(error as Error);
        } finally {
            setIsLoading(false);
        }
    };
    React.useEffect(() => {
        fetchData(url);
    }, [url]);

    return { data, errors, isLoading };
}
