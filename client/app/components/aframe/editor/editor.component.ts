import { EditorService } from './editor.service';
import { SceneService } from '../scene/scene.service';
import { EDITOR_MODELS } from './editor-models.constant';

import template from './editor.html';

/**
 * The scene editor is an attachment for the scene
 * component that allows in-scene editing of scene elements.
 * It should only be rendered directly by the server, when
 * an admin user is logged in.
 * @example
 * <aframe-scene> <!-- required -->
 *   <scene-editor></scene-editor>
 * </aframe-scene>
 */
export const EditorComponent: ng.IComponentOptions = {
	template,
  require: {
  	SceneCtrl: '^aframeScene'
  },
  /**
   * This controller is only instantiated with the server-rendered
   * editor component. It works by mounting a number of its
   * behaviours onto the scene component's `SceneCtrl` directly
   * and by proxying the `SceneService` service.
   */
  controller: class EditorController implements ng.IController {
    /**
     * Editor's reference to what the database's data schema's should look like.
     */
    _schemas = EDITOR_MODELS;
    /**
     * Property to store the state of the current scene with regard to
     * whether there are unsaved changes.
     */
    _unpublishedChanges: boolean = false;
    _panelRef;

    SceneCtrl: ng.IController;

    draftList: any[];
    $sceneEl: JQuery

    constructor(
      private SceneService: SceneService,
      private $aframeEditor: EditorService,
      private $timeout,
      private $mdPanel,
      private $mdDialog,
    ) {
      'ngInject';
    }

    /**
     * Utility method for keeping controller's model of scene data in
     * sync with `SceneService`'s.
     * 
     * @param  {Object} data Scene data to update with
     */
    updateSceneData(data: vt.IScene) {
      Object.assign(this.SceneCtrl, data);
      this.SceneService.scene = data;
      console.info('updated scene with data from editor:', data);
    }

    /**
     * Proxy method for `$aframeEditor.saveDraft()`.
     * 
     * @param  {Boolean}  notify  Whether to inform user of success.
     */
    saveDraft(notify = true): Promise<any> {
      return this.$aframeEditor.saveDraft(notify);
    }

    /**
     * Proxy method for `$aframeEditor.loadDraft()`.
     * 
     * @param  {Object}   draft   Chosen draft from draftList
     * @param  {Boolean}  notify  Whether to inform user of success.
     */
    loadDraft(draft, notify = true): Promise<any> {
      return this.$aframeEditor.loadDraft(draft._id, notify)
        .then(draftContent => this.updateSceneData(draftContent));
    }

    /**
     * Calls `$aframeEditor.checkForDraft()` and sets the controller's
     * `draftList` property to an array of drafts resolved from promise.
     *
     * If drafts are found, notifies the user; offers to load the latest draft.
     * Loads draft if user confirms and updates the scene data accordingly.
     * 
     * @param {Boolean} notify  Whether to inform the user with toast
     */
    checkForDraft(notify = true): Promise<any> {
      this.draftList = null;
      return this.$aframeEditor.checkForDraft(notify)
        .then(drafts => {
          this.draftList = drafts;
          return drafts.length&&notify&&this.$aframeEditor.draftFound(drafts);
        })
        .then(foundDraftContent => foundDraftContent&&this.updateSceneData(foundDraftContent));
    }

    /**
     * Confirms with user that they would like to discard the draft
     * in question; calls `$aframeEditor.discardDraft()` if user confirms.
     * 
     * @param {Object}  draft   The draft to discard
     * @param {Boolean} notify  Whether to inform user with toast
     */
    discardDraft(draft, notify = true): Promise<any> {
      const confirm = this.$mdDialog.confirm()
        .title('Are you sure?')
        .textContent('This action cannot be undone.')
        .ok('Confirm')
        .cancel('Cancel');
      return this.$mdDialog.show(confirm).then(() => {
        return this.$aframeEditor.discardDraft(draft._id, notify);
      });
    }

    /**
     * Calls `$aframeEditor.publish()` directly (proxy method); updates
     * scene data immediately afterward to keep app and server in sync.
     * 
     * @param  {Object|Boolean}  newData Data to publish or false
     * @param  {Boolean}         notify  Whether to inform user with toast
     * @return {Promise}                 Resolves to updated scene data
     */
    publish(newData?: vt.IScene, notify = true): Promise<any> {
      return this.$aframeEditor.publish(newData, notify)
        .then(sceneData => this.updateSceneData(sceneData));
    }

    /**
     * The editor controller's `$onInit` hook takes care of attaching a few
     * editor methods and properties directly on the scene controller – it's
     * strategy is to define and intialize all editor behaviour _separate_ from
     * the scene, so that non-admin users do not have any of its behaviours
     * attached (or included).
     *
     * The things it attaches are:
     * - A contextmenu listener: since a number of components have different actions
     * based on right clicks, a general "flag" needs to be set on the scene
     * controller (`_rightclick`) so components can just check for the flag on any scene click.
     *   - Also attaches `$onDestroy` for cleanup
     * - The editor's `checkForDraft()` and `openEditor()` methods
     * - An `_editable` flag that allows the scene controller to display the UI
     */
    $onInit() {
      const contextMenu = event => {
        event.stopPropagation();
        if (!this.SceneCtrl._rightClick) {
          this.SceneCtrl._rightClick = event;
          event.preventDefault();
          this.SceneCtrl.$sceneEl.on('mouseup', () => {
            this.SceneCtrl.$sceneEl.off('mouseup');
            this.$timeout(() => {
              this.SceneCtrl._rightClick = false;
            })
          });
        }
      };
      this.SceneCtrl.$sceneEl.on('contextmenu', contextMenu);
      this.SceneCtrl.$onDestroy = () => {
        this.$sceneEl.off('contextmenu', contextMenu);
      }

      this.SceneCtrl.checkForDraft = () => this.checkForDraft();
      this.SceneCtrl.editItem = (ev, item, collection) => this.editItem(ev, item, collection);

      this.SceneCtrl._editable = true;
    }

    /**
     * Queues up a new item (hotSpot/sceneLink/entity/etc) for addition to the current
     * scene. Only collections that have their model explicitly defined in `DATA_MODELS`
     * **and** as an option in the editor 'add item' selection (`_editor.html`) will be
     * available for use.
     * 
     * @param  {Event}   ev         The mouseEvent that called the method
     * @param  {Array}   collection Collection of scene elements to add item to
     * @return {Promise}            Promise representing dialog reference
     */
    addItem(ev: MouseEvent, collection) {
      const locals: vt.IEditorLocals = { item: this._schemas[collection] };

      locals.newItem = true;
      locals.publish = () => this.$aframeEditor.addItemTo(locals.item, this.SceneCtrl[collection], newData => {
        this.SceneService.scene[collection] = newData;
        this._panelRef&&this._panelRef.close();
      });
      locals.saveDraft = () => this.$aframeEditor.addItemTo(locals.item, this.SceneCtrl[collection], newData => {
        this.SceneService.scene[collection] = newData;
        this.saveDraft();
      });
      locals.removeThis = () => this._panelRef&&this._panelRef.close();
      locals.closeDialog = locals.removeThis;

      return this.openEditor(ev, locals);
    }

    /**
     * Queues up a new scene for creation/publishing. WIP.
     *
     * @todo Panorama upload
     * @todo Go to scene after created
     * 
     * @param  {Event} ev The mouseEvent that called the method
     * @return {Promise}  Promise representing dialog reference
     */
    newScene(ev: MouseEvent) {
      const locals: vt.IEditorLocals = { item: this._schemas.scene };

      locals.newItem = true;
      locals.publish = () => {
        this.$aframeEditor.publish(locals.item);
        this._panelRef&&this._panelRef.close();
      };
      locals.saveDraft = () => {
        locals.item.state = 'draft';
        locals.publish();
      };
      locals.removeThis = () => this._panelRef&&this._panelRef.close();
      locals.closeDialog = locals.removeThis;

      return this.openEditor(ev, locals);
    }

    /**
     * Opens a generic context menu 'edit' dialog for scene elements. Mostly
     * proxies this controller's method's directly inside the editor dialog.
     * Includes a horizontal offset that approximates the width of most average
     * scene elements to center the dialog's origin.
     *  
     * @param  {Event} ev                 The mouseEvent that called the method
     * @param  {Object} item              The item to edit
     * @param  {Array<Object>} collection The item's collection in the scene
     * @return {Promise}                  Promise representing dialog reference
     */
    editItem(ev: MouseEvent, item, collection) {

      const locals: vt.IEditorLocals = { item };
      locals.publish = () => this.publish();
      locals.saveDraft = () => this.saveDraft();
      locals.removeThis = () => this.$aframeEditor.removeItemFrom(item, collection, () => {
        this._panelRef&&this._panelRef.close();
      });
      locals.closeDialog = () => this._panelRef&&this._panelRef.close();

      return this.openEditor(ev, locals, { offsetY: -250 });
    }

    /**
     * Base method for layering other dialog types into. This method
     * handles the actual initialization of the editor dialog component
     * using the ng-material panel service's `$mdPanel.open()` method on
     * a panel preset built in `editor_config.js`.
     *
     * If the item loaded into the editor is considered "new", the dialog
     * is readied for the center of the screen; otherwise, it is placed
     * in the bottom-left. The animate-to-and-from is calculated using
     * the original MouseEvent that opened the dialog.
     *
     * An `onDomRemoved()` method is added to clean up the dialog scope
     * when its elements are removed; the scope is provided by a promise
     * returned by this method.
     * 
     * @param  {Event} ev               The mouseEvent that called the method
     * @param  {Object} locals          Local values to pass into dialog
     * @param  {Number} $2.offsetX      Pixels to shift dialog along X
     * @param  {Number} $2.offsetY      Pixels to shift dialog along Y
     * @return {Promise}                Promise representing dialog scope
     */
    openEditor(ev: MouseEvent, locals, { offsetX = 0, offsetY = 0 } = {}) {
      console.log('editor.component] openEditor', (ev.clientY + offsetY))
      const position = this.$mdPanel.newPanelPosition();
      if (locals.newItem) {
        position.absolute().center();
      } else {
        position.absolute().bottom(0).left(0);
      }
      const animation = this.$mdPanel.newPanelAnimation()
        .openFrom({top: (ev.clientY + offsetY), left:( ev.clientX + offsetX) })
        .withAnimation(this.$mdPanel.animation.SCALE)
        .closeTo({top: (ev.clientY + offsetY), left:( ev.clientX + offsetX) });
      const onDomRemoved = () => {
        this._panelRef&&this._panelRef.destroy();
      };

      return this.$mdPanel.open('editorDialog', {
        position, animation, onDomRemoved, locals
      }).then(scope => {
        this._panelRef = scope;
      });
    }
  }
};
