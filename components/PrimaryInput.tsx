export default function PrimaryInput(props: any) {
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
            inputMode={props.inputMode}
            required={props.required}
            onKeyPress={props.onKeyPress}
        />
    );
}
