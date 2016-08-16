export type Policy = {
    onInvariantViolation(): void
    onPostConditionViolation(): void
    onPreConditionViolation(): void
}
