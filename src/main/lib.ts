import {Policy} from "./policy";

export function dbc(policy: Policy) {
    return {
        inv<Target>(predicate: (target: Target) => [boolean]) {
            return function (target: Target, name: string, description: PropertyDescriptor) {
                if (!predicate(target)) {
                    policy.onInvariantViolation();
                }
            };
        },
        post<Target, Return>(predicate: (return$: Return, target?: Target) => [boolean]) {
            return function (target: Target, name: string, description: PropertyDescriptor) {
                const return$ = target[name]() as Return;
                if (!predicate(return$, target)) {
                    policy.onPostConditionViolation();
                }
            };
        },
        pre<Target, Arguments>(predicate: (arguments$: Arguments, target?: Target) => [boolean]) {
            return function (target: Target, name: string, description: PropertyDescriptor) {
                const arguments$ = [1, '2', {}] as Arguments;
                if (!predicate(arguments$, target)) {
                    policy.onPreConditionViolation();
                }
            };
        }
    };
}
