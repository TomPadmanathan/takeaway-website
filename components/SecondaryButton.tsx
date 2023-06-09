export default function SecondaryButton(props: any) {
    return (
        <button
            className={
                props.addClass
                    ? 'block h-10 border border-black ' + props.addClass
                    : 'block h-10 border border-black'
            }
            onClick={props.onClick}
        >
            {props.content}
        </button>
    );
}
