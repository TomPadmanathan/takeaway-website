export interface checkoutInfoGuest {
    includeCutlery: boolean;
    phoneNumber: number;
    email: string;
    addressLine1: string;
    addressLine2?: string;
    cityTown: string;
    postcode: string;
    orderNote: string;
    forename: string;
    surname: string;
    userType?: 'guest';
    userId?: string;
}
export interface checkoutInfoUser {
    orderNote: string;
    includeCutlery: boolean;
    userType?: 'user';
    userId?: string;
}
