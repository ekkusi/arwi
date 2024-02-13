import dotenv from "dotenv";
import fetch, { RequestInit, Response } from "node-fetch";

export type TrackParams = {
  action_name?: string;
  lang?: string;
  userInfo?: {
    uid?: string;
    custom?: {
      [key: string]: any;
    };
    [key: string]: any;
  };
  custom?: {
    [key: string]: any;
  };
  [key: string]: any;
};

/**
 * @constructor
 * @param {Number} siteId     Id of the site you want to track
 * @param {String} trackerUrl URL of your Matomo instance
 * @param {Boolean} [true] noURLValidation Set to true if the `piwik.php` has been renamed
 */
export class MatomoTracker {
  private siteId: number;

  private trackerUrl: string | null;

  private disabledInDev: boolean;

  constructor(siteId: number, baseUrl: string | null, disabledInDev = true) {
    if (!baseUrl) this.trackerUrl = null;
    else {
      const normalizedUrlBase = baseUrl[baseUrl.length - 1] !== "/" ? `${baseUrl}/` : baseUrl;
      this.trackerUrl = `${normalizedUrlBase}matomo.php`;
    }
    this.siteId = siteId;
    this.disabledInDev = disabledInDev;
  }

  trackEventFullInfo(category: string, action: string, name?: string, value?: number, params: TrackParams = {}) {
    return this.track({
      e_c: category,
      e_a: action,
      e_n: name,
      e_v: value,
      ...params,
    });
  }

  trackEvent(category: string, action: string, params: TrackParams = {}) {
    return this.track({
      e_c: category,
      e_a: action,
      ...params,
    });
  }

  trackEventWithValue(category: string, action: string, value: number, params: TrackParams = {}) {
    return this.track({
      e_c: category,
      e_a: action,
      e_v: value,
      ...params,
    });
  }

  // trackAction(name: string, params: TrackParams = {}) {
  //   return this.track({
  //     action_name: name,
  //     // ca: 1, // Custom action, see https://developer.matomo.org/api-reference/tracking-api
  //     ...params,
  //   });
  // }

  /**
   * Executes the call to the Matomo tracking API
   *
   * For a list of tracking option parameters see
   * https://developer.matomo.org/api-reference/tracking-api
   *
   * @param {(Object)} options URL to track or options (must contain URL as well)
   */
  track(params: TrackParams): Promise<Response> | null {
    if ((process.env.NODE_ENV !== "production" && this.disabledInDev) || !this.trackerUrl) return null;
    const { lang, userInfo, custom, ...data } = params;

    const { custom: customUserInfo, ...restUserInfo } = userInfo || {};

    const requestOptions: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        ...(lang && { "Accept-Language": lang }),
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      body: new URLSearchParams({
        idsite: this.siteId.toString(),
        rec: "1",
        apiv: "1",
        send_image: "0",
        ...restUserInfo,
        ...(customUserInfo && { _cvar: JSON.stringify(customUserInfo) }),
        ...(custom && { cvar: JSON.stringify(custom) }),
        ...data,
      }).toString(),
    };

    return fetch(this.trackerUrl, requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}

dotenv.config();

const SITE_ID = process.env.MATOMO_SITE_ID ? Number(process.env.MATOMO_SITE_ID) : 1;
const { MATOMO_BASE_URL } = process.env;

if (!MATOMO_BASE_URL) console.warn("MATOMO_BASE_URL not set, Matomo tracking is disabled");

const matomo = new MatomoTracker(SITE_ID, MATOMO_BASE_URL || null);

export default matomo;
