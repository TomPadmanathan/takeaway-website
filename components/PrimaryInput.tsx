interface props {
    type?:
        | 'button'
        | 'checkbox'
        | 'color'
        | 'date'
        | 'datetime-local'
        | 'email'
        | 'file'
        | 'hidden'
        | 'image'
        | 'month'
        | 'number'
        | 'password'
        | 'radio'
        | 'range'
        | 'reset'
        | 'search'
        | 'submit'
        | 'tel'
        | 'text'
        | 'time'
        | 'url'
        | 'week';
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
        | 'decimal';
    onKeyPress?: (event: any) => void;
    onChange?: (event: any) => void;
    addClass?: string;
    value?: string;
}

export default function PrimaryInput(props: props) {
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
