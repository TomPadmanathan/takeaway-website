// Components
import BottomNav from '@/components/nav/BottomNav';
import Footer from '@/components/Footer';

export default function PrivacyPolicy(): JSX.Element {
    return (
        <>
            <BottomNav />
            <Page>
                <div className="mx-10 h-screen bg-white">
                    <h1>Privacy Policy1</h1>
                    <h1>Privacy Policy2</h1>
                    <h1>Privacy Policy3</h1>
                    <h1>Privacy Policy4</h1>
                    <h1>Privacy Policy5</h1>
                    <h1>Privacy Policy6</h1>
                    <h1>Privacy Policy7</h1>
                    <h1>Privacy Policy</h1>
                    <h1>Privacy Policy</h1>
                    <h1>Privacy Policy</h1>
                </div>
            </Page>
            <Footer />
        </>
    );
}

interface children {
    children: JSX.Element;
}
function Page({ children }: children) {
    return <section className="h-screen bg-lightblue">{children}</section>;
}
