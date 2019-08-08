import { UserState } from "../shared/state/user-state.reducer";

// Representation of the entire app state
// Extended by lazy loaded modules
export interface State {
  user: UserState;
}
