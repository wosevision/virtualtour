declare module '*.html' {
  const content: string;
  export default content;
}

declare interface Window {
  REQUIRED_MODULES: string[];
}

declare type MongoId = string;

/**
 * nz-tour namespace
 */
declare namespace nztour {
  export interface ITourService {
    // props
    config: ITourStepConfig,
    body: HTMLElement,
    current: boolean,
    box: boolean,
    // utils
    throttle: (callback: () => any, limit: number) => () => void,
    debounce: (func: (...args) => any, wait: number, immediate: boolean) => () => void,
    // methods            
    start: (tour: ITourConfig) => Promise<any>,
    stop: () => void,
    pause: () => void,
    next: () => Promise<any>,
    previous: () => Promise<any>,
    gotoStep: () => Promise<any>,
  }

  export interface ITourConfig {
    config: ITourStepConfig,
    steps: ITourStepConfig,
  }

  export interface ITourStepConfig {
    mask?: {
      visible?: boolean, // Shows the element mask
      visibleOnNoTarget?: boolean, // Shows a full page mask if no target element has been specified
      clickThrough?: boolean, // Allows the user to interact with elements beneath the mask
      clickExit?: boolean, // Exit the tour when the user clicks on the mask
      scrollThrough?: boolean // Allows the user to scroll the scrollbox or window through the mask
      color?: string // The mask color
    },
    scrollBox?: string, // The container to scroll when searching for elements
    previousText?: string,
    nextText?: string,
    finishText?: string,
    showPrevious?: boolean, // Setting to false hides the previous button
    showNext?: boolean // Setting to false hides the next button
    animationDuration?: number, // Animation Duration for the box and mask
    placementPriority?: string[],
    dark?: boolean, // Dark mode (Works great with `mask.visible = false`)
    disableInteraction?: boolean, // Disable interaction with the highlighted elements
    highlightMargin?: number, // Margin of the highglighted area
    disableEscExit?: boolean, // Disable end of tour when pressing ESC,
    onClose?: () => any, //Function called when the tour is closed
    onComplete?: () => any, //Function called when the tour is completed
  }

  export interface ITourStep extends ITourStepConfig {
    target?: string,
    content: string,
  }
}

/**
 * Virtual tour namespace
 */
declare namespace vt {

  export interface ICMSMetadata {
    _id: MongoId;
    __v?: number;
    updatedBy?: string;
    updatedAt?: Date;
    createdBy?: string;
    createdAt?: Date;
  }

  export interface ISuggestion {
    title: string,
    desc: string,
    icon: string,
    link?: string,
    action?: (option) => void;
  }

  export interface IErrorSuggestion extends ISuggestion {
    goToSettings?: boolean;
  }

  export type IWelcomeTip = ISuggestion;

  export interface IWelcomeTipContent {
    label?: string,
    image?: string,
    content?: string
  }

  export interface IWelcomeTipGroup {
    title: string | string[],
    tips: IWelcomeTipContent[]
  }

  export interface ICloudinaryImage {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    url: string;
    secure_url: string;
  }

  type QueryParam = any;
  export interface IQueryParams {
    [key: string]: QueryParam;
  }

  export interface ITourState {
    location?: string;
    building?: string;
    scene?: IScene;
  }

  export interface ITourUserName {
    last: string;
    first: string;
  }

  export type IUsageLevel = [number, number, number]; // [imageQual, loadTime, dataUse]
  export interface ITourUserSetting {
    val: number | boolean;
    min: number;
    max: number;
    step: number;
    label: string;
    labels: string[],
    icon: string,
    levels: {
      /**
       * `comparator` is a string representing conditional evaluation,
       * values are represented as an array of three numbers.
       */
      [comparator: string]: IUsageLevel
    }
  }

  type ITourUserPreference = Partial<ITourUserSetting>;

  export interface ITourUserUsage {
    cache: ITourUserPreference; 
    resolution: ITourUserPreference; 
    preloading: ITourUserPreference; 
    compression: ITourUserPreference; 
    auto: ITourUserPreference; 
  }

  export interface ITourUserSettings {
    showWelcome: ITourUserPreference;
    showHints: ITourUserPreference;
    toolbarCondensed: ITourUserPreference;
    toolbarOpen: ITourUserPreference;
  }

  export type IPanorama = ICloudinaryImage;
  export type ITourUserAvatar = ICloudinaryImage;

  export interface ITourUser extends ICMSMetadata {
    name: Partial<ITourUserName>;
    password: string;
    email: string;
    userId: string;
    bannerId: number;
    isContributor: boolean;
    isEditor: boolean;
    isAdmin: boolean;
    usage: Partial<ITourUserUsage>;
    settings: Partial<ITourUserSettings>,
    avatar: Partial<ITourUserAvatar>,
  }

  export interface ISceneLink extends ICMSMetadata {
    scene: string;
    rotation: number[];
    position: number[];
  }

  export interface IHotSpot extends ICMSMetadata {
    name: string;
    desc: string;
    position: number[];
    linked: boolean;
    feature: string;
  }

  export interface IEntityAttribute extends ICMSMetadata {
    val: string | number,
    prop: string;
  }

  export interface IEntity extends ICMSMetadata {
    type: string;
    entities: IEntity[],
    attrs: IEntityAttribute[]
  }

  type SceneOrId = IScene | MongoId;
  type SceneCode = string;
  export interface IScene extends ICMSMetadata {
    name: string;
    code: SceneCode;
    parent: SceneOrId;
    entities: IEntity[],
    hotSpots: IHotSpot[],
    sceneLinks: ISceneLink[],
    panorama: IPanorama
  }
  type ISceneResource = ng.resource.IResource<IScene> | IScene;
  type ISceneResourceArray = ng.resource.IResourceArray<IScene[]> | IScene[];

  export interface ISceneEditorMessage {
    textContent: string;
    action: string;
    highlightAction: boolean;
    highlightClass: string;
    position: string;
    hideDelay: number;
  }
  
  type PromiseOrVoid = void | Promise<any>;
  interface IEditorLocals {
    item;
    newItem?: boolean;
    publish?(): PromiseOrVoid;
    saveDraft?(): PromiseOrVoid;
    removeThis?(): PromiseOrVoid;
    closeDialog?(): PromiseOrVoid;
  }

  export interface INetworkConnectionVal {
    val: boolean | number;
  }

  export interface INetworkConnection {
    network: {
      speeds: {
        download: number,
        upload: number,
        originalDownload: number,
        originalUpload: number
      },
      client: {
        ip: string,
        lat: number,
        lon: number,
        isp: string,
        isprating: number,
        rating: number,
        ispdlavg: number,
        ispulavg: number
      },
      server: {
        host: string,
        lat: number,
        lon: number,
        location: string,
        country: string,
        cc: string,
        sponsor: string,
        distance: number,
        distanceMi: number,
        ping: number,
        id: string
      }
    },
    useragent: {
      ua: string,
      browser: {
        name: string,
        version: string,
        major: string
      },
      engine: {
        version: string,
        name: string,
      },
      os: {
        name: string,
        version: string
      },
      device: {
        type: string
      },
      cpu: any
    }
  }

  export interface IDrilldownItem extends ICMSMetadata {
    _params: object;
    _level: string;
    _hidden: boolean;
    _active: boolean;

    default: string;
    label: string;
    name: string;
    code: string;
    
    children?: IDrilldownItem[];
  }

  export interface IButtonbar {
    sidebar?,
    views,
    blurredViews: string[],
    currentView: string,
    visible: boolean,
    condensed: boolean,
    toggle: () => void,
    condense: () => boolean,
    hasState: (state) => boolean,
    hasBlur: any
  }
}