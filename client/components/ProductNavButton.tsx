export default function ProductNavButton(props: any) {
    return (
        <button
            onClick={() => {
                props.setActiveProductNav(props.title);
            }}
            className={`border-2 border-black p-3 mx-3 ${
                props.activeProductNav == props.title ? 'bg-slate-500' : null
            }`}
        >
            {props.title.charAt(0).toUpperCase() + props.title.slice(1)}
        </button>
    );
}
