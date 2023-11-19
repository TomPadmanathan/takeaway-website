interface props {
    title: string;
    children: JSX.Element;
}

export default function Page({ children, title }: props): JSX.Element {
    return (
        <div className="bg-gradient-to-r from-pink to-lightpink">
            <div className="flex h-64 items-center justify-center">
                <h1 className="text-5xl text-white">{title}</h1>
            </div>
            <section className="h-screen">
                <div className="mx-10 flex h-screen justify-center rounded-t-xl bg-white">
                    <div className="block">{children}</div>
                </div>
            </section>
        </div>
    );
}
