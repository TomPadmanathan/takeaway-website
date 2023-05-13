export default function ProductTab(props: any) {
    return (
        <>
            <div
                className={`absolute left-0 right-0 grid place-items-center ${
                    props.open ? 'opacity-1' : 'opacity-0 pointer-events-none'
                }`}
            >
                <></>
            </div>
        </>
    );
}
