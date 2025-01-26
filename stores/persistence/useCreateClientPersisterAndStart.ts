import * as UIReact from 'tinybase/ui-react/with-schemas';
import { Content, MergeableStore, OptionalSchemas } from 'tinybase/with-schemas';
import { createClientPersister } from './createClientPersister';

export const useCreateClientPersisterAndStart = <Schemas extends OptionalSchemas>(
  storeId: string,
  store: MergeableStore<Schemas>,
  initialContentJson?: string,
  then?: () => void
) =>
  (UIReact as UIReact.WithSchemas<Schemas>).useCreatePersister(
    store,
    // Create the persister.
    (store: MergeableStore<Schemas>) => createClientPersister(storeId, store),
    [storeId],
    async (persister) => {
      // Determine if there is initial content for a newly-created store.
      let initialContent: Content<Schemas> | undefined = undefined;
      try {
        initialContent = JSON.parse(initialContentJson);
      } catch {}

      // Start the persistence.
      await persister.load(initialContent);
      await persister.startAutoSave();
      then?.();
    },
    [initialContentJson]
  );
