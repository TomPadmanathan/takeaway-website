export default function SecondaryButton(props: any) {
    let defaultClasses = 'block h-10 border border-black';

    return (
        <button
            className={
                props.addClass
                    ? defaultClasses + ' ' + props.addClass
                    : defaultClasses
            }
            onClick={props.onClick}
            type={props.type}
        >
            {props.content}
        </button>
    );
}
