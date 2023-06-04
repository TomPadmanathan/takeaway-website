export default function SecondaryButton(props: any) {
    return (
        <button
            className={'h-10 border border-black p-2 ' + props.addClass}
            onClick={props.onClick}
        >
            {props.content}
        </button>
    );
}
