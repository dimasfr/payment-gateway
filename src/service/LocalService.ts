const STATE_TOKEN = "state" as string;

/**
 * @description get token form localStorage
 */
export const getData = (): string | null => {
  return window.localStorage.getItem(STATE_TOKEN);
};

/**
 * @description save token into localStorage
 * @param token: string
 */
export const saveData = (token: string): void => {
  window.localStorage.setItem(STATE_TOKEN, token);
};

/**
 * @description remove token form localStorage
 */
export const destroyData = (): void => {
  window.localStorage.removeItem(STATE_TOKEN);
};

export default { getData, saveData, destroyData };
