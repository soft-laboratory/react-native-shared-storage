declare module '@software-lab/react-native-shared-storage' {
  export interface SharedStorageStatic {
    isAppInstalledAndroid: (packageName: string) => Promise<void>;
    getItemForGroup: (
      key: string,
      appGroup: string,
      options?: SharedStorageStaticOptions
    ) => Promise<string>;
    setItemForGroup: (
      key: string,
      value: string,
      appGroup: string,
      options?: SharedStorageStaticOptions
    ) => Promise<void>;
    removeItemForGroup: (
      key: string,
      appGroup: string,
      options?: SharedStorageStaticOptions
    ) => Promise<void>;
    getItem: (key: string) => Promise<string>;
    setItem: (key: string, value: string) => Promise<void>;
    removeItem: (key: string) => Promise<void>;
  }

  interface SharedStorageStaticOptions {
    useAndroidSharedPreferences?: boolean;
  }

  export function createSharedStorage(
    defaultGroupKey?: string,
    defaultOptions?: SharedStorageStaticOptions
  ): SharedStorageStatic;
}
