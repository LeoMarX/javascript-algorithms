export const comparator = {
    compare(a: unknown, b: unknown): 0 | -1 | 1 {
        if (a === b) {
            return 0;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return a > b ? 1 : -1;
    },
    equal(a: unknown, b: unknown): boolean {
        return this.compare(a, b) === 0;
    },
    greaterThan(a: unknown, b: unknown): boolean {
        return this.compare(a, b) > 0;
    },
    lessthan(a: unknown, b: unknown): boolean {
        return this.compare(a, b) < 0;
    }
}