import { createLocalPersister } from 'tinybase/persisters/persister-browser/with-schemas';
import { MergeableStore, OptionalSchemas } from 'tinybase/with-schemas';

export const createClientPersister = <Schemas extends OptionalSchemas>(
  store: MergeableStore<Schemas>,
  storeId: string
) => createLocalPersister(store, storeId);
