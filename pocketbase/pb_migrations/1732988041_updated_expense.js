/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3161059916');

    // update collection data
    unmarshal(
      {
        name: 'expenses',
      },
      collection
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3161059916');

    // update collection data
    unmarshal(
      {
        name: 'expense',
      },
      collection
    );

    return app.save(collection);
  }
);
