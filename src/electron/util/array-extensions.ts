export function removeIf<T>(arr: T[], callback: (item: T, idx: number) => boolean) {
    let i = 0;
    while (i < arr.length) {
        if (callback(arr[i], i)) {
            arr.splice(i, 1);
        } else {
            i++;
        }
    }
}
