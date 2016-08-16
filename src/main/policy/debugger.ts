import {Policy} from "../policy";

export const DEBUGGER: Policy = {
    onInvariantViolation() {
        // "callee contract violation";
        debugger;
    },
    onPostConditionViolation() {
        // "callee contract violation";
        debugger;
    },
    onPreConditionViolation() {
        // "caller contract violation";
        debugger;
    }
};

