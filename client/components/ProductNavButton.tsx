import capitaliseFirstChar from '@/utils/capitaliseFirstChar';

export default function ProductNavButton(props: any) {
    const [activeProductNav, setActiveProductNav] = props.activeProductNav;

    return (
        <button
            onClick={() => {
                setActiveProductNav(props.title);
            }}
            className={`border-2 border-black p-3 mx-3 ${
                activeProductNav == props.title ? 'bg-slate-500' : null
            }`}
        >
            {capitaliseFirstChar(props.title)}
        </button>
    );
}
