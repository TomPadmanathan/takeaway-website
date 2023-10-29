// Components
import AdminNav from '@/components/adminDashboard/AdminNav';
import OrdersTable from '@/components/adminDashboard/orders/OrdersTable';

export default function TodaysOrders(): JSX.Element {
    return (
        <>
            <AdminNav />
            <OrdersTable today />
        </>
    );
}
