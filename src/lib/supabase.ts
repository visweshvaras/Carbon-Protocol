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

const sanitizeString = (str: string): string => {
  return str.replace(/[&<>"']/g, (match) => {
    const map: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    };
    return map[match];
  });
};

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
    const sanitizedUser: UserState = {
      ...user,
      id: sanitizeString(user.id),
      name: sanitizeString(user.name),
      q1_answer: user.q1_answer ? sanitizeString(user.q1_answer) : undefined,
      q2_answer: user.q2_answer ? sanitizeString(user.q2_answer) : undefined,
      q3_answer: user.q3_answer ? sanitizeString(user.q3_answer) : undefined,
      q4_answer: user.q4_answer ? sanitizeString(user.q4_answer) : undefined,
    };
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(sanitizedUser));
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
      user_id: sanitizeString(action.user_id),
      action_type: sanitizeString(action.action_type),
      score_change: action.score_change,
      description: sanitizeString(action.description),
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
