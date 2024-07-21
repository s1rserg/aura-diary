import { createListenerMiddleware, isRejected } from "@reduxjs/toolkit";
import type {
  TypedStartListening,
  ListenerEffectAPI,
  UnknownAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../../common/types/types";

export const listenerMiddleware = createListenerMiddleware();
export type AppStartListening = TypedStartListening<RootState, AppDispatch>;
export const startAppListening =
  listenerMiddleware.startListening as AppStartListening;

function isActionWithError(
  action: UnknownAction
): action is UnknownAction & { error: SerializedError } {
  return "error" in action && action.error !== undefined;
}

const handleSignOut = async (
  action: UnknownAction,
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>
) => {
  if (isActionWithError(action)) {
    if (action.error.message === "Unauthorized user") {
      listenerApi.dispatch({ type: "auth/signOut" });
    }
  }
};

startAppListening({
  predicate: (action): action is UnknownAction & { error: SerializedError } => {
    return isRejected(action);
  },
  effect: handleSignOut,
});
