import { ActionTypes } from "./actionTypes";

export const initialState = {
  past: [],
  present: 0,
  future: [],
};

export const counterReducer = (state, action) => {
  const { past, present, future } = state;

  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {
        past: [...past, present],
        present: present + 1,
        future: [],
      };

    case ActionTypes.DECREMENT:
      return {
        past: [...past, present],
        present: present - 1,
        future: [],
      };

    case ActionTypes.INCREMENT_BY:
      return {
        past: [...past, present],
        present: present + action.payload,
        future: [],
      };

    case ActionTypes.UNDO: {
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    }

    case ActionTypes.REDO: {
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    }

    case ActionTypes.RESET:
      return {
        past: [],
        present: 0,
        future: [],
      };

    default:
      return state;
  }
};
