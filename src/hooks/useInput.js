import React, {useState} from 'react';

export function useInput(initialValue) {
    const [inputFormState, setInputFormState] = useState(initialValue)
    const handleInputChg = (e) => {
        setInputFormState((prev) => ({
            ...prev, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
        }))
    }
    return [handleInputChg, inputFormState]
}

