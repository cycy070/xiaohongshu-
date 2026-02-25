export const FlowState = Object.freeze({
  IDLE: 'IDLE',
  VALIDATING: 'VALIDATING',
  TESTING: 'TESTING',
  ANALYZING: 'ANALYZING',
  COMPLETED: 'COMPLETED',
});

const TRANSITIONS = {
  [FlowState.IDLE]: [FlowState.VALIDATING],
  [FlowState.VALIDATING]: [FlowState.TESTING, FlowState.IDLE],
  [FlowState.TESTING]: [FlowState.ANALYZING, FlowState.IDLE],
  [FlowState.ANALYZING]: [FlowState.COMPLETED, FlowState.TESTING],
  [FlowState.COMPLETED]: [FlowState.IDLE],
};

function getStorage() {
  if (typeof sessionStorage !== 'undefined') return sessionStorage;
  let mem = {};
  return {
    getItem: (k) => (k in mem ? mem[k] : null),
    setItem: (k, v) => {
      mem[k] = String(v);
    },
    removeItem: (k) => {
      delete mem[k];
    },
  };
}

export class TestFlowController {
  constructor(storageKey = 'mirrorsoul.test.session') {
    this.storage = getStorage();
    this.storageKey = storageKey;
    this.state = FlowState.IDLE;
    this.context = {
      activationCode: null,
      currentQuestionIndex: 0,
      answers: [],
      startedAt: null,
    };
  }

  canTransition(nextState) {
    return TRANSITIONS[this.state]?.includes(nextState) || false;
  }

  transition(nextState) {
    if (!this.canTransition(nextState)) {
      throw new Error(`Invalid state transition: ${this.state} -> ${nextState}`);
    }
    this.state = nextState;
    this.persist();
    if (nextState === FlowState.COMPLETED) {
      this.clearSession();
    }
  }

  updateContext(partial) {
    this.context = { ...this.context, ...partial };
    this.persist();
  }

  persist() {
    const snapshot = {
      state: this.state,
      context: this.context,
      savedAt: Date.now(),
    };
    this.storage.setItem(this.storageKey, JSON.stringify(snapshot));
  }

  resume() {
    const raw = this.storage.getItem(this.storageKey);
    if (!raw) return null;

    try {
      const snapshot = JSON.parse(raw);
      if (snapshot?.state && snapshot?.context) {
        this.state = snapshot.state;
        this.context = snapshot.context;
        return snapshot;
      }
    } catch {
      this.clearSession();
    }

    return null;
  }

  clearSession() {
    this.storage.removeItem(this.storageKey);
    this.state = FlowState.IDLE;
    this.context = {
      activationCode: null,
      currentQuestionIndex: 0,
      answers: [],
      startedAt: null,
    };
  }
}
