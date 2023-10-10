interface props {
    addClass?: string;
    onClick?: (event: React.MouseEvent<HTMLElement>) => void;
    content: string;
    type?: 'button' | 'reset' | 'submit';
}

export default function SecondaryButton(props: props) {
    let defaultClasses: string = 'block h-10 border border-black p-2';

    return (
        <button
            className={
                props.addClass
                    ? defaultClasses + ' ' + props.addClass
                    : defaultClasses
            }
            onClick={props.onClick}
        >
            {props.content}
        </button>
    );
}
