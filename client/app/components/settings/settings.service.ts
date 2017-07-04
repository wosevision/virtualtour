export class SettingsService {
  get: (key: string) => any;
  set: (key: string, value: any) => any;
  constructor(
    private store
  ) {
    'ngInject';
    return store.getNamespacedStore('appSettings');
  }
}
