/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useState } from 'react'

const useForm = <T,>(callback: () => any, initialState: T) => {
    const [values, setValues] = useState(initialState)

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
        })
    }

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        await callback()
    }

    return {
        onChange,
        onSubmit,
        values,
        setValues,
    }
}

export default useForm
