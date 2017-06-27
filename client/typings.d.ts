declare module '*.html' {
  const content: string;
  export default content;
}

declare namespace vt {
  export interface ITourState {
    location?: string;
    building?: string;
    scene?: string;
  }

  export interface ITourUser {
    settings: object;
    usage: object;
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
}