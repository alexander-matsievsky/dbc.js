export function dbc(policy) {
  return {
    inv(predicate) {
      return function (target, name, description) {
        if (!predicate(target, name, description)) {
          policy.onInvariantViolation(target, name, description);
        }
      }
    },
    post(predicate) {
      return function (target, name, description) {
        if (!predicate(target, name, description)) {
          policy.onPostConditionViolation(target, name, description);
        }
      }
    },
    pre(predicate) {
      return function (target, name, description) {
        if (!predicate(target, name, description)) {
          policy.onPreConditionViolation(target, name, description);
        }
      }
    }
  };
}

export const POLICY = {
  DEBUGGER: {
    onInvariantViolation() {
      void 'callee contract violation';
      debugger;
    },
    onPostConditionViolation() {
      void 'callee contract violation';
      debugger;
    },
    onPreConditionViolation() {
      void 'caller contract violation';
      debugger;
    }
  }
};