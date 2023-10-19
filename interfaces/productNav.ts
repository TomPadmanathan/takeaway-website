export type productNavButton =
    | 'popular'
    | 'chinese'
    | 'japanese'
    | 'korean'
    | 'indonesian'
    | 'thai';

export type activeProductNav = [
    activeProductNav: productNavButton,
    setActiveProductNav: React.Dispatch<React.SetStateAction<productNavButton>>
];
