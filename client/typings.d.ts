declare module '*.html' {
  const content: string;
  export default content;
}

declare interface Window {
  REQUIRED_MODULES: string[];
}

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

declare namespace vt {
  export interface IErrorSuggestion {
    title: string,
    desc: string,
    icon: string,
    goToSettings?: boolean;
    action?: (option) => void;
  }

  export interface IWelcomeTip {
    title?: string,
    icon?: string,
    link?: string,
    desc?: string,
  }

  export interface IWelcomeTipContent {
    label?: string,
    image?: string,
    content?: string
  }

  export interface IWelcomeTipGroup {
    title: string | string[],
    tips: IWelcomeTipContent[]
  }

  export interface ITourState {
    location?: string;
    building?: string;
    scene?: string;
  }

  export interface ITourUserName {
    last: string;
    first: string;
  }

  export interface ITourUserUsage {
    cache: number;
    resolution: number;
    preloading: number;
    compression: number;
    auto: boolean
  }

  export interface ITourUserSettings {
    showWelcome: boolean;
    showHints: boolean;
    toolbarCondensed: boolean;
    toolbarOpen: boolean;
  }

  export interface ITourUserAvatar {
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

  export interface ITourUser {
    _id: string;
    __v: number;
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
    updatedAt: Date;
    updatedBy: string;
  }

  export interface IPanorama {
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

  export interface IToolbar {
    sidebar?,
    views,
    blurredViews: string[],
    currentView: string,
    open: boolean,
    condensed: boolean,
    toggle: () => void,
    condense: () => boolean,
    onSelect: (state) => void,
    hasState: (state) => boolean,
    hasBlur: any
  }
}