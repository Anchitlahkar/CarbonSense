import { create } from 'zustand';
import { 
  UserProfile, 
  CarbonEntry,
  BehaviorProfile,
  ForecastProfile,
  OptimizationPlan,
  CarbonDNAProfile,
  PlanetTwinProfile
} from '@carbonsense/shared-types';
import supabase from '../lib/supabase';
import { fetchContextApi } from '../lib/api';

interface CarbonState {
  user: UserProfile | null;
  session: any | null;
  isLoading: boolean;
  error: string | null;
  carbonEntries: CarbonEntry[];
  behaviorProfile: BehaviorProfile | null;
  forecastProfile: ForecastProfile | null;
  optimizationPlan: OptimizationPlan | null;
  carbonDNAProfile: CarbonDNAProfile | null;
  planetTwinProfile: PlanetTwinProfile | null;
  setUser: (user: UserProfile | null) => void;
  setSession: (session: any | null) => void;
  setLoading: (isLoading: boolean) => void;
  setCarbonEntries: (entries: CarbonEntry[]) => void;
  addCarbonEntry: (entry: CarbonEntry) => void;
  loginMock: (username: string) => void;
  logout: () => Promise<void>;
  fetchContext: () => Promise<void>;
}

export const useCarbonStore = create<CarbonState>((set, get) => ({
  user: null,
  session: null,
  isLoading: false,
  error: null,
  carbonEntries: [],
  behaviorProfile: null,
  forecastProfile: null,
  optimizationPlan: null,
  carbonDNAProfile: null,
  planetTwinProfile: null,

  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  setCarbonEntries: (carbonEntries) => set({ carbonEntries }),

  addCarbonEntry: (entry) =>
    set((state) => ({
      carbonEntries: [entry, ...state.carbonEntries],
    })),

  loginMock: (username) => {
    const mockUser: UserProfile = {
      id: 'mock-user-id-123',
      username,
      avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=' + username,
      country: 'IN',
      isOnboarded: true,
      targetReductionGoal: 25,
      createdAt: new Date(),
    };
    set({ user: mockUser, session: { access_token: 'mock-jwt-token' } });
    
    // Automatically load telemetry context after mock login
    get().fetchContext();
  },

  logout: async () => {
    try {
      if (supabase && import.meta.env.VITE_SUPABASE_URL) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.error('Error during Supabase signout', err);
    } finally {
      set({ 
        user: null, 
        session: null, 
        carbonEntries: [],
        behaviorProfile: null,
        forecastProfile: null,
        optimizationPlan: null,
        carbonDNAProfile: null,
        planetTwinProfile: null,
        error: null
      });
    }
  },

  fetchContext: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchContextApi();
      set({
        behaviorProfile: data.behaviorProfile,
        forecastProfile: data.forecastProfile,
        optimizationPlan: data.optimizationPlan,
        carbonDNAProfile: data.carbonDNAProfile,
        planetTwinProfile: data.planetTwinProfile,
        isLoading: false,
      });
    } catch (err: any) {
      console.error('Failed to fetch user carbon telemetry:', err);
      set({ 
        error: err.message || 'Failed to load telemetry context', 
        isLoading: false 
      });
    }
  }
}));

export default useCarbonStore;

