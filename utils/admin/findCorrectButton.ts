export default function findCorrectBtn(currentStatus: string): string {
    const status: string[] = ['pending', 'accepted', 'dispatched', 'delivered'];
    const btnHeadings: string[] = ['Accept', 'Dispatch', 'Delivered'];

    let correctBtnHeading: string = '';
    status.forEach((value: string, index: number): void => {
        if (currentStatus === value) correctBtnHeading = btnHeadings[index];
    });
    return correctBtnHeading;
}
