// Purely local database interface using localStorage (No Supabase dependency)
export interface UserState {
  id: string;
  name: string;
  score: number;
  q1_answer?: string;
  q2_answer?: string;
  q3_answer?: string;
  q4_answer?: string;
  created_at: string;
}

export interface UserAction {
  id: string;
  user_id: string;
  action_type: string;
  score_change: number;
  description: string;
  created_at: string;
}

const MOCK_USER_KEY = 'anime_carbon_user';
const MOCK_ACTIONS_KEY = 'anime_carbon_actions';

export const mockDb = {
  getUser: (): UserState | null => {
    if (typeof window === 'undefined') return null;
    const data = localStorage.getItem(MOCK_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setUser: (user: UserState): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(user));
  },

  clearUser: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(MOCK_USER_KEY);
    localStorage.removeItem(MOCK_ACTIONS_KEY);
  },

  getActions: (userId: string): UserAction[] => {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(MOCK_ACTIONS_KEY);
    const actions: UserAction[] = data ? JSON.parse(data) : [];
    return actions.filter(action => action.user_id === userId);
  },

  addAction: (action: Omit<UserAction, 'id' | 'created_at'>): UserAction => {
    const newAction: UserAction = {
      ...action,
      id: Math.random().toString(36).substring(2, 9),
      created_at: new Date().toISOString(),
    };
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(MOCK_ACTIONS_KEY);
      const actions: UserAction[] = data ? JSON.parse(data) : [];
      actions.unshift(newAction);
      localStorage.setItem(MOCK_ACTIONS_KEY, JSON.stringify(actions));
      
      // Update user score
      const user = mockDb.getUser();
      if (user && user.id === action.user_id) {
        user.score = Math.max(0, Math.min(100, user.score + action.score_change));
        mockDb.setUser(user);
      }
    }
    return newAction;
  }
};
