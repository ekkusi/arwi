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

  private trackerUrl: string;

  constructor(siteId: number, baseUrl: string) {
    const normalizedUrlBase = baseUrl[baseUrl.length - 1] !== "/" ? `${baseUrl}/` : baseUrl;
    this.siteId = siteId;
    this.trackerUrl = `${normalizedUrlBase}matomo.php`;
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
  track(params: TrackParams): Promise<Response> {
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

if (!MATOMO_BASE_URL) throw new Error("Missing Matomo base URL, define MATOMO_BASE_URL in .env (or root .env.production in production)");

const matomo = new MatomoTracker(SITE_ID, MATOMO_BASE_URL);

export default matomo;
