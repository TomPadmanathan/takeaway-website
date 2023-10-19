// Types/Interfaces
import { ChangeEvent, KeyboardEvent } from 'react';

interface props {
    type?: string;
    placeholder?: string;
    id?: string;
    required?: boolean;
    inputMode?:
        | 'search'
        | 'text'
        | 'email'
        | 'tel'
        | 'url'
        | 'none'
        | 'numeric'
        | 'decimal'
        | undefined;
    onKeyPress?: (event: KeyboardEvent<HTMLInputElement>) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    addClass?: string;
    value?: string;
}

export default function PrimaryInput(props: props): JSX.Element {
    return (
        <input
            type={props.type ? props.type : 'text'}
            placeholder={props.placeholder}
            id={props.id}
            className={
                props.addClass
                    ? 'block h-10 border border-black ' + props.addClass
                    : 'block h-10 border border-black'
            }
            value={props.value}
            inputMode={props.inputMode}
            required={props.required}
            onChange={props.onChange}
            onKeyPress={props.onKeyPress}
        />
    );
}
