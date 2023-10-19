// Utils
import capitaliseFirstChar from '@/utils/capitaliseFirstChar';

// Types/Interfaces
import { activeProductNav, productNavButton } from '@/interfaces/productNav';

interface props {
    activeProductNav: activeProductNav;
    title: productNavButton;
}

export default function ProductNavButton(props: props): JSX.Element {
    const [activeProductNav, setActiveProductNav] = props.activeProductNav;

    return (
        <button
            onClick={(): void => setActiveProductNav(props.title)}
            className={`mx-3 border-2 border-black p-3 ${
                activeProductNav == props.title ? 'bg-slate-500' : null
            }`}
        >
            {capitaliseFirstChar(props.title)}
        </button>
    );
}
