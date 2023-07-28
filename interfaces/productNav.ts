export type productNavButtons =
    | 'popular'
    | 'chinese'
    | 'japanese'
    | 'korean'
    | 'indonesian'
    | 'thai';

export type activeProductNav = [
    activeProductNav: productNavButtons,
    setActiveProductNav: React.Dispatch<React.SetStateAction<productNavButtons>>
];
