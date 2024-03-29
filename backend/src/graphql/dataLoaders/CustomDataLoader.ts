import DataLoader from "dataloader";

export default class CustomDataLoader<K, V, C = K> extends DataLoader<K, V, C> {
  async load(key: K): Promise<V> {
    const value = await super.load(key);

    // Check if the value is an error and throw it
    if (value instanceof Error) {
      throw value;
    }

    return value;
  }
}
