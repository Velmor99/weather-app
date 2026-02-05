import { useState, useRef, useEffect } from "react";
import { UncontrolledTextInput } from "../components/UncontrolledTextInput";
import { Hint } from "../components/Hint";
import { createCityWorker } from "../services/cityWorker.client";
import { useDebounce } from "../hooks/useDebounce";
import type { City } from "../types/cityWorkerTypes";

export default function SearchBar() {
    const inputRef = useRef<HTMLInputElement>(null);
    const cityWorker = useRef<ReturnType<typeof createCityWorker> | null>(null);
    const [hints, setHints] = useState<City[]>([]);

    useEffect(() => {
        cityWorker.current = createCityWorker();

        return () => {
            cityWorker.current?.destroy();
        };
    }, [])

    const handleInput = async () => {
        const value = inputRef.current?.value;

        if(!value || value.length < 2) {
            setHints([]);
            return;
        }

        const result = await cityWorker.current?.filter(value)
        setHints(result ?? []);
    }

    const handleHintClick = (hint: City) => {
        // TODO: handle hint click
        console.log(hint)
        setHints([]);
        inputRef.current!.value = "";
    }

    const debouncedInput = useDebounce(handleInput, 300);

    return (
        <>
            <UncontrolledTextInput ref={inputRef as React.RefObject<HTMLInputElement>} onChange={debouncedInput} />
            {hints.length > 0 && hints.map(hint => (
                <Hint
                    key={hint.id}
                    content={hint.name}
                    onClick={() => handleHintClick(hint)}
                />
            ))}
        </>
    )
}