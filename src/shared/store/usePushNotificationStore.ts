import { create } from 'zustand';

interface PushNotificationState {
  isSubscribed: boolean;
  subscription: PushSubscription | null;
  subscribe: (userSubscription: PushSubscription) => void;
  unsubscribe: () => void;
}

const usePushNotificationStore = create<PushNotificationState>((set) => ({
  isSubscribed: false,
  subscription: null,
  subscribe: (userSubscription) => set({ isSubscribed: true, subscription: userSubscription }),
  unsubscribe: () => set({ isSubscribed: false, subscription: null }),
}));

export default usePushNotificationStore;