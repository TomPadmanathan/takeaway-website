interface children {
    children: JSX.Element | string;
}

export default function HighlightText({ children }: children): JSX.Element {
    return <span className="text-pink">{children}</span>;
}
