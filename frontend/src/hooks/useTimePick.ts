import { useReducer } from 'react';
import { Time } from '../pages/SetWakeupTime';

type Action =
  | { type: 'SET_HOUR'; hour: string }
  | { type: 'SET_MINUTE'; minute: string }
  | { type: 'SET_MERIDIEM'; meridiem: string };

const reducer = (state: Time, action: Action) => {
  switch (action.type) {
    case 'SET_HOUR':
      return {
        ...state,
        hour: action.hour,
      };
    case 'SET_MINUTE':
      return {
        ...state,
        minute: action.minute,
      };
    case 'SET_MERIDIEM':
      return {
        ...state,
        meridiem: action.meridiem,
      };
  }
};

export const useTimePick = (initialState: Time) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setHour = (hour: string) => {
    dispatch({ type: 'SET_HOUR', hour });
  };

  const setMinute = (minute: string) => {
    dispatch({ type: 'SET_MINUTE', minute });
  };

  const setMeridiem = (meridiem: string) => {
    dispatch({ type: 'SET_MERIDIEM', meridiem });
  };

  return {
    setHour,
    setMinute,
    setMeridiem,
    time: state,
  };
};
