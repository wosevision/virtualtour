import { SkyService } from './sky.service';

export const SkyComponent: ng.IComponentOptions = {
  bindings: {
    sky: '<',
    preload: '<?'
  },
  require: {
    SceneCtrl: '^aframeScene'
  },
  /**
   * The `SkyCtrl` class is largely responsible for
   * orchestrating the translation of URLs into IDs
   * and then into DOM elements for attaching to the scene.
   *
   * It attaches a single `<a-sky/>` the first time a sky is
   * loaded, and attaches `<img/>`s to the scenes assets
   * preload bucket based on the `$aframeSky` service's instructions.
   */
  controller: class SkyController implements ng.IController {
    compileSkyEl: (callback: ng.ICloneAttachFunction) => ng.IAugmentedJQuery;

    $sceneEl: ng.IAugmentedJQuery;
    $assetsEl: ng.IAugmentedJQuery;
    $skyEl: ng.IAugmentedJQuery;

    _skyElLoaded: boolean;
    _skyLoadedList: string[];
    loadedSky: string;

    SceneCtrl: ng.IController;

    /**
     * Initializes the controller's dependencies:
     * - Binds a special one-off $compile function for when
     *   the scene's `<a-sky />` needs to be compiled
     * - Attaches the $aframeSky service directly
     */
    constructor(
      private $scope: ng.IScope,
      private $compile: ng.ICompileService,
      private $aframeSky: SkyService
    ) {
      'ngInject';
      this.compileSkyEl = (callback) => $compile('<a-sky ng-src="{{ \'#\' + $ctrl.loadedSky }}" />')($scope, callback);
    }

    /**
     * Store JQLite-wrapped `<a-scene>` and `<a-assets>`;
     * init internal check for right click event.
     */
    $onInit() {
      /**
       * Cache vars to store JQLite <img> and <a-sky>
       * Flag for init sky load and array of loaded skies
       */
      this.$sceneEl = this.SceneCtrl.$sceneEl;
      this.$assetsEl = this.SceneCtrl.$assetsEl;
      this._skyElLoaded = false;
      this._skyLoadedList = []; //this.$aframeSky.CircularBuffer(10);
    }

    /**
     * Lifecycle hook that is invoked every time `SkyCtrl.sky`
     * changes value. The first change is discarded since it will
     * always return `null` or `undefined`.
     */
    $onChanges(newData: ng.IOnChangesObject) {
      if (newData.sky.isFirstChange()) return;
      let skyUrl = newData.sky.currentValue;
      if (skyUrl) this.setSky(skyUrl, this.assetIdFromSkyUrl(skyUrl));
    }

    /**
     * Utility function for stripping the `public_id`
     * property out of a URL segment in the form of
     * `[version]/[path/to/image]/[public_id]`.
     */
    assetIdFromSkyUrl(skyUrl: string): string {
      return skyUrl.split('scenes/panorama/')[1].split('.')[0]
    }

    /**
     * Uses the $aframeSky service to fetch a server-generated
     * list of `skyUrl`s for asset preloading. It grabs the `_id`
     * of the current active scene from `SceneCtrl` and sends it
     * through `$aframeSky.getPreloadList()` to generate the list
     * based on scenelinks in the current active scene.
     *
     * `assetIdFromSkyUrl()` turns each `skyUrl` into an `assetId`,
     * which is checked against the list of preloaded assets.
     * If the asset hasn't been loaded and stored already, 'loadSkyAsset()'
     * queues it up for loading into the scene's `<a-assets></a-assets>`.
     * 
     * @return {Promise} Promise that holds an array of skyUrls from server
     */
    preload(): Promise<any> {
      return this.$aframeSky.getPreloadList(this.SceneCtrl._currentSceneId)
        .then((toPreload: string[]) => {
          toPreload.forEach(skyUrl => {
            const newAssetId = this.assetIdFromSkyUrl(skyUrl)
            if (!this._skyLoadedList.includes(newAssetId)) {
              this.loadSkyAsset(skyUrl, newAssetId);
            }
          });
        })
        .catch(err => {
          console.warn(err);
        });
    }

    /**
     * Sets the current active sky to an `assetId`. This updates the
     * binding in the scene's `<a-sky ng-src="{{ $ctrl.loadedSky }}" />`
     * to the provided `assetId`, which should match the `id=""` of a
     * asset that has already been fully loaded since this represents
     * the largest and final change a user perceives when switching scenes.
     *
     * If this function is being called, it is safe to assume all
     * requisite loading steps for scene transition have completed, so
     * it is safe to `preload()` the next wave of assets.
     */
    setSkyId(assetId: string) {
      this.loadedSky = assetId;
      this.preload();
    }

    /**
     * Acts as a buffer function to `setSkyId()` by checking if the
     * incoming assetId is already in the list of loaded skies –
     * if the list includes the ID, `setSkyId()` is called on the ID
     * directly. If the ID is missing from the list, `loadSkyAsset()`
     * is initiated.
     * 
     * `setSkyId()` is called after the promise is resolved inside its
     * `then()` method, where a check is also performed whether the
     * scene needs an `<a-sky />` element.
     * 
     * @param {string} skyUrl  Panorama URL segment
     * @param {string} assetId Panorama's public_id
     */
    setSky(skyUrl: string, assetId: string) {
      console.info('[sky.component] setSky');
      return this._skyLoadedList.includes(assetId) ?
        this.setSkyId(assetId) :
        this.loadSkyAsset(skyUrl, assetId)
          .then(assetId => {
            if(!this._skyElLoaded) {
              this.$skyEl = this.loadSkyEl();
            }
            this.setSkyId(assetId)
          });
    }

    /**
     * Compiles a new image asset with requested URL and ID;
     * adds element to assets and ID to list to prevent reload.
     */
    loadSkyAsset(skyUrl: string, assetId: string): Promise<string> {
      console.info('[sky.component] loadSkyAsset');
      return this.$aframeSky.getSkyDomNode(skyUrl, assetId)
        .then(imgNode => {
          this.$assetsEl.append(imgNode);
          this._skyLoadedList.push(assetId);
          console.info('[sky.component] loadSkyAsset', skyUrl, imgNode);
          return assetId;
        })
    }

    /**
     * Runs the `compileSkyEl()` method from the constructor
     * to build the sky element; attaches it to the scene
     * and marks the element as loaded.
     * 
     * @param  {string} sky ID for asset reference
     * @return {Element}    JQLite-wrapped <a-sky> element
     */
    loadSkyEl(): ng.IAugmentedJQuery {
      console.info('[sky.component] loadSkyEl');
      return this.compileSkyEl(clone => {
        this.$sceneEl.append(clone);
        this._skyElLoaded = true;
        console.info('[sky.component] loadSkyEl', clone)
        return clone;
      });
    }
  }
};