import { useState, useEffect } from 'react';
import { IS_DEBUG, SUBSCRIPTION_STATUS_KEY } from '../utils/constants';

export function useSubscription() {
  const [hasSubscription, setHasSubscription] = useState(() => {
    if (IS_DEBUG) {
      const stored = localStorage.getItem(SUBSCRIPTION_STATUS_KEY);
      return stored ? JSON.parse(stored) : false;
    }
    return false;
  });

  const toggleSubscription = () => {
    if (IS_DEBUG) {
      const newStatus = !hasSubscription;
      setHasSubscription(newStatus);
      localStorage.setItem(SUBSCRIPTION_STATUS_KEY, JSON.stringify(newStatus));
    }
  };

  return { hasSubscription, toggleSubscription };
}