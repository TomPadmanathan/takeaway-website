export interface Employee {
    checkedIn: boolean;
    name: string;
}
export interface Array {
    [index: number]: Employee;
}

export interface CartProps {
    isVisible: boolean;
}
