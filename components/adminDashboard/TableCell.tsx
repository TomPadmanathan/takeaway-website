interface children {
    children: string | JSX.Element | null;
    border?: boolean;
    onClick?: () => void;
}
export default function TableCell({ children, border, onClick }: children) {
    return (
        <td className="p-1">
            <div
                className={`rounded bg-lightergrey p-10 ${
                    border && 'border-[2px] border-lightgrey text-grey2'
                } ${
                    children &&
                    onClick &&
                    'cursor-pointer transition-all hover:bg-lightgrey hover:text-white'
                }`}
                onClick={onClick}
            >
                <p className={`${!children && 'p-3'}`}>{children}</p>
            </div>
        </td>
    );
}
