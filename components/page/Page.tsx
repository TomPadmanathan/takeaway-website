interface props {
    title: string;
    children: JSX.Element;
    subTitle: string;
}

export default function Page({
    children,
    title,
    subTitle,
}: props): JSX.Element {
    return (
        <div className="bg-gradient-to-r from-pink to-lightpink">
            <div className="flex h-64 items-center justify-center text-white">
                <div className="block text-center">
                    <h1 className="pb-2 text-5xl">{title}</h1>
                    <h3>{subTitle}</h3>
                </div>
            </div>
            <section>
                <div className="mx-10 flex justify-center rounded-t-xl bg-white p-24">
                    <div className="block">{children}</div>
                </div>
            </section>
        </div>
    );
}
