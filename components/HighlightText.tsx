interface children {
    children: JSX.Element | string;
    color?: 'red' | 'pink';
}

export default function HighlightText({
    children,
    color,
}: children): JSX.Element {
    return (
        <span className={`${color === 'red' ? 'text-red' : 'text-pink'}`}>
            {children}
        </span>
    );
}
