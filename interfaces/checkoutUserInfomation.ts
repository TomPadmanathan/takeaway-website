export interface checkoutUserInfomation {
    includeCutlery: boolean;
    phoneNumber: number;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    cityTown: string;
    postcode: string;
    orderNote?: string;
}
