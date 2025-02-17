export function nullValues<T extends Record<string, any>>(input: T): T {
    return Object.entries(input).reduce((acc, [key, value]) => {
        acc[key] = value === '' ? null : value
        return acc
    }, {} as Record<string, any>) as T
}