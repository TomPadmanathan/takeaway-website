// Components
import AdminNav from '@/components/adminDashboard/AdminNav';
import OrdersTable from '@/components/adminDashboard/orders/OrdersTable';
import BottomNav from '@/components/page/nav/BottomNav';
import Footer from '@/components/page/Footer';

export default function TodaysOrders(): JSX.Element {
    return (
        <>
            <div className="h-screen">
                <BottomNav />
                <AdminNav />
                <OrdersTable today />
            </div>
            <Footer />
        </>
    );
}
