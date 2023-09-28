/* eslint-disable no-await-in-loop */
import { GridlyBackendOptions } from "i18next-gridly-backend";
import { BackendModule, InitOptions, Services } from "i18next";

// Copy of the GridlyBackend class from i18next-gridly-backend since the original module doesn't work with Next server components for some reason
export default class CustomGridlyBackend implements BackendModule<GridlyBackendOptions> {
  static type: "backend" = "backend";

  constructor(services: Services, backendOptions: GridlyBackendOptions, i18nextOptions: InitOptions) {
    this.services = services;
    this.backendOptions = backendOptions;
    this.i18nextOptions = i18nextOptions;
  }

  type = CustomGridlyBackend.type;

  services;

  backendOptions;

  i18nextOptions;

  init(services: Services, backendOptions: GridlyBackendOptions, i18nextOptions: InitOptions) {
    this.services = services;
    this.backendOptions = backendOptions;
    this.i18nextOptions = i18nextOptions;
  }

  async read(language: string, namespace: string) {
    const { apiKey, viewId, namespaceColumnId } = this.backendOptions;
    const MAX_LIMIT = 1000;
    let offset = 0;
    let totalCount = 0;
    let records: any[] = [];
    do {
      const query = new URLSearchParams({
        page: JSON.stringify({ limit: MAX_LIMIT, offset }),
        columnIds: language,
        query: JSON.stringify({
          ...(namespaceColumnId ? { [namespaceColumnId]: { "=": namespace } } : {}),
        }),
      });
      const response = await fetch(`https://api.gridly.com/v1/views/${viewId}/records?${query}`, { headers: { Authorization: `ApiKey ${apiKey}` } });
      const json = await response.json();
      if (!response.ok) throw json;
      records = records.concat(json);
      totalCount = Number(response.headers.get("x-total-count"));
      offset += MAX_LIMIT;
    } while (offset < totalCount);
    const result: { [key: string]: string } = {};
    for (const record of records) {
      const recordId = record.id;
      const value = record.cells[0]?.value;
      result[recordId] = value;
    }
    return result;
  }

  async create(languages: readonly string[], namespace: string, key: string, fallbackValue: string) {
    const { apiKey, viewId, namespaceColumnId, onSaveSuccess } = this.backendOptions;
    const cells = languages.map((language) => ({
      columnId: language,
      value: fallbackValue,
    }));
    if (namespaceColumnId) {
      const namespaceCell = {
        columnId: namespaceColumnId,
        value: namespace,
      };
      cells.push(namespaceCell);
    }
    const records = [{ id: key, cells }];
    const response = await fetch(`https://api.gridly.com/v1/views/${viewId}/records`, {
      method: "POST",
      headers: {
        Authorization: `ApiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(records),
    });
    const json = await response.json();
    if (!response.ok) throw json;
    onSaveSuccess?.(languages, namespace);
  }
}
