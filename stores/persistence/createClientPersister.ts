import * as SQLite from 'expo-sqlite';
import { createExpoSqlitePersister } from 'tinybase/persisters/persister-expo-sqlite/with-schemas';
import { MergeableStore, OptionalSchemas } from 'tinybase/with-schemas';

export const createClientPersister = <Schemas extends OptionalSchemas>(
  store: MergeableStore<Schemas>,
  storeId: string
) => createExpoSqlitePersister(store, SQLite.openDatabaseSync(storeId + '.db'));
