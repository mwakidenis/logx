const hasLocalStorage = typeof localStorage !== "undefined";
const hasSessionStorage = typeof sessionStorage !== "undefined";
const hasDocument = typeof document !== "undefined";
const hasWindow = typeof window !== "undefined";
const isBrowser = hasWindow && hasDocument;
const isNode =
  typeof process !== "undefined" && typeof process.versions.node !== "undefined";

export { isBrowser, isNode, hasLocalStorage, hasSessionStorage };

export interface StorageHelpers {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
  clear: () => void;
}

export function safeStorage(storage: Storage): StorageHelpers {
  return {
    get: (key: string) => {
      try {
        return storage.getItem(key);
      } catch {
        return null;
      }
    },
    set: (key: string, value: string) => {
      try {
        storage.setItem(key, value);
      } catch {
        // storage quota exceeded or private browsing restriction
      }
    },
    remove: (key: string) => {
      try {
        storage.removeItem(key);
      } catch {
        // ignore
      }
    },
    clear: () => {
      try {
        storage.clear();
      } catch {
        // ignore
      }
    },
  };
}

export function getCookie(name: string): string | null {
  if (!hasDocument) return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${encodeURIComponent(name)}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : null;
}

export function setCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
  } = {}
): void {
  if (!hasDocument) return;
  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  if (options.maxAge !== undefined) cookie += `; Max-Age=${options.maxAge}`;
  if (options.path) cookie += `; Path=${options.path}`;
  if (options.domain) cookie += `; Domain=${options.domain}`;
  if (options.secure) cookie += "; Secure";
  if (options.httpOnly) cookie += "; HttpOnly";
  document.cookie = cookie;
}

export function removeCookie(
  name: string,
  options: { path?: string; domain?: string } = {}
): void {
  if (!hasDocument) return;
  let cookie = `${encodeURIComponent(name)}=; Max-Age=0`;
  if (options.path) cookie += `; Path=${options.path}`;
  if (options.domain) cookie += `; Domain=${options.domain}`;
  document.cookie = cookie;
}

export function localStorageHelpers(): StorageHelpers | null {
  if (!hasLocalStorage) return null;
  return safeStorage(localStorage);
}

export function sessionStorageHelpers(): StorageHelpers | null {
  if (!hasSessionStorage) return null;
  return safeStorage(sessionStorage);
}
