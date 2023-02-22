import { useEffect, useRef } from "react";

// get previous children using ref
const usePrevious = <T>(value: T): T => {
    const prevChildrenRef:any = useRef<T>();
    
    useEffect(() => {
        prevChildrenRef.current = value;
    }, [value]);

    return prevChildrenRef.current;
};

export default usePrevious;