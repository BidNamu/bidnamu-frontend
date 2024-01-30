import React, {useState} from 'react';

export function useInput(initialValue) {
    const [inputFormState, setInputFormState] = useState(initialValue)
    const handleInputChg = (e) => {
        if(e.target.type === "file") {
            setInputFormState([...e.target.files])
        }
        else {
            setInputFormState((prev) => ({
                ...prev, [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
            }))
        }
    }
    return [handleInputChg, inputFormState]
}

