import { Inject, Injectable } from 'ng-metadata/core';

@Injectable()
export class SettingsService {
  get: (key: string) => any;
  set: (key: string, value: any) => any;
  constructor(
    @Inject('store') private store
  ) {
    return store.getNamespacedStore('appSettings');
  }
}
