import { NativeModules, Platform } from 'react-native';
import type {
  SharedStorageStatic,
  SharedStorageStaticOptions,
} from 'react-native-shared-storage';

const LINKING_ERROR =
  `The package 'react-native-shared-storage' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const SharedStorage = NativeModules.SharedStorage
  ? NativeModules.SharedStorage
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export function createSharedStorage(
  defaultGroupKey?: string,
  defaultOptions?: SharedStorageStaticOptions
): SharedStorageStatic {
  return {
    async isAppInstalledAndroid(packageName: string) {
      return new Promise((resolve, reject) => {
        SharedStorage.isAppInstalledAndroid(
          packageName,
          (installed: boolean) => {
            if (installed) {
              resolve();
            } else {
              reject();
            }
          }
        );
      });
    },

    async getItemForGroup(
      key: string,
      appGroup: string,
      inputOptions?: SharedStorageStaticOptions
    ): Promise<string> {
      return new Promise((resolve, reject) => {
        if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
          reject(Platform.OS);
        }

        const options = inputOptions || {};
        SharedStorage.getItem(
          key,
          appGroup,
          options,
          (errorCode: string | null, item: string) => {
            errorCode ? reject(errorCode) : resolve(item);
          }
        );
      });
    },

    async setItemForGroup(
      key: string,
      value: string,
      appGroup: string,
      inputOptions?: SharedStorageStaticOptions
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
          reject(Platform.OS);
        }

        const options = inputOptions || {};

        SharedStorage.setItem(
          key,
          value,
          appGroup,
          options,
          (errorCode: string | null) => {
            errorCode ? reject(errorCode) : resolve();
          }
        );
      });
    },

    async removeItemForGroup(
      key: string,
      appGroup: string,
      inputOptions?: SharedStorageStaticOptions
    ): Promise<void> {
      return new Promise((resolve, reject) => {
        if (Platform.OS !== 'ios' && Platform.OS !== 'android') {
          reject(Platform.OS);
        }

        const options = inputOptions || {};

        SharedStorage.removeItem(
          key,
          appGroup,
          options,
          (errorCode: string | null) => {
            errorCode ? reject(errorCode) : resolve();
          }
        );
      });
    },

    async removeItem(key: string): Promise<void> {
      if (!defaultGroupKey) {
        throw new Error('defaultGroupKey is not set');
      }

      return this.removeItemForGroup(key, defaultGroupKey, defaultOptions);
    },

    async setItem(key: string, value: string): Promise<void> {
      if (!defaultGroupKey) {
        throw new Error('defaultGroupKey is not set');
      }

      return this.setItemForGroup(key, value, defaultGroupKey, defaultOptions);
    },

    async getItem(key: string): Promise<string> {
      if (!defaultGroupKey) {
        throw new Error('defaultGroupKey is not set');
      }

      return this.getItemForGroup(key, defaultGroupKey, defaultOptions);
    },
  };
}
