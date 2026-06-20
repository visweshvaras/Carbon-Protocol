import { mockDb, UserState } from '../lib/supabase';

describe('supabase mockDb unit tests', () => {
  beforeEach(() => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  });

  test('should return null when no user is saved', () => {
    expect(mockDb.getUser()).toBeNull();
  });

  test('should save and get user', () => {
    const user: UserState = {
      id: 'test-user-id',
      name: 'Pilot Ken',
      score: 80,
      created_at: new Date().toISOString()
    };
    mockDb.setUser(user);
    expect(mockDb.getUser()).toEqual(user);
  });

  test('should clear user and action logs', () => {
    const user: UserState = {
      id: 'test-user-id',
      name: 'Pilot Ken',
      score: 80,
      created_at: new Date().toISOString()
    };
    mockDb.setUser(user);
    
    mockDb.addAction({
      user_id: 'test-user-id',
      action_type: 'SOLAR_GRID',
      score_change: 10,
      description: 'Used solar energy grid calibration.'
    });

    mockDb.clearUser();
    expect(mockDb.getUser()).toBeNull();
    expect(mockDb.getActions('test-user-id')).toEqual([]);
  });

  test('should add actions and modify user score within 0-100 bounds', () => {
    const user: UserState = {
      id: 'user-1',
      name: 'Eco Warrior',
      score: 50,
      created_at: new Date().toISOString()
    };
    mockDb.setUser(user);

    // Positive score change
    const action1 = mockDb.addAction({
      user_id: 'user-1',
      action_type: 'COMPOSTING',
      score_change: 20,
      description: 'Planted 5 trees and composted organic kitchen waste.'
    });

    expect(action1.id).toBeDefined();
    expect(action1.created_at).toBeDefined();
    expect(action1.user_id).toBe('user-1');
    expect(mockDb.getUser()?.score).toBe(70);

    // Negative score change exceeding limit
    mockDb.addAction({
      user_id: 'user-1',
      action_type: 'COAL_POWER',
      score_change: -80,
      description: 'Burned extra coal.'
    });
    expect(mockDb.getUser()?.score).toBe(0); // Clamped at 0

    // Positive score change exceeding limit
    mockDb.addAction({
      user_id: 'user-1',
      action_type: 'MAX_CLEAN',
      score_change: 150,
      description: 'Super clean solar panels.'
    });
    expect(mockDb.getUser()?.score).toBe(100); // Clamped at 100
  });

  test('should return empty actions array if user has no actions', () => {
    expect(mockDb.getActions('non-existent-user')).toEqual([]);
  });
});
