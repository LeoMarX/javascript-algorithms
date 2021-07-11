export const comparator = {
    campare(a: string | number, b: string | number): 0 | -1 | 1 {
        if (a === b) {
            return 0;
        }

        return a > b ? 1 : -1;
    },
    equal(a: unknown, b: unknown): boolean {
        return this.campare(a, b) === 0;
    },
    greaterThan(a: unknown, b: unknown): boolean {
        return this.campare(a, b) > 0;
    },
    lessthan(a: unknown, b: unknown): boolean {
        return this.campare(a, b) < 0;
    }
}