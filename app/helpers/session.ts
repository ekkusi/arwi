import * as SecureStore from "expo-secure-store";
import { SESSION_ID_KEY } from "../config";

let cachedSessionId: string | null = null;

export async function getSessionId() {
  if (!cachedSessionId) {
    cachedSessionId = await SecureStore.getItemAsync(SESSION_ID_KEY);
  }
  return cachedSessionId;
}

export async function setSessionId(sessionId: string) {
  if (cachedSessionId === sessionId) return;
  cachedSessionId = sessionId;
  await SecureStore.setItemAsync(SESSION_ID_KEY, sessionId);
}

export async function removeSessionId() {
  cachedSessionId = null;
  await SecureStore.deleteItemAsync(SESSION_ID_KEY);
}
