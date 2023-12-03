interface children {
    children: JSX.Element | string;
    color?: 'red' | 'pink' | 'darkgrey';
}

export default function HighlightText({
    children,
    color,
}: children): JSX.Element {
    return (
        <span
            className={`${
                color === 'red'
                    ? 'text-red'
                    : color === 'darkgrey'
                    ? 'text-grey2'
                    : 'text-pink'
            }`}
        >
            {children}
        </span>
    );
}
