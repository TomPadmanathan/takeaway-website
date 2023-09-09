export interface order {
    DateTime: string;
    Email: string;
    Name: string;
    PhoneNumber: string;
    CityTown: string;
    AddressLine1: string;
    AddressLine2?: string;
    PostCode: string;
    OrderNote: string;
    StripeCustomerID: string;
    StringPaymentId: string;
    Products: string;
    TotalPayment: number;
    OrderId: number;
}

export type orders = order[];
