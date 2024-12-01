/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3161059916');

    // add field
    collection.fields.addAt(
      4,
      new Field({
        hidden: false,
        id: 'bool2063623452',
        name: 'status',
        presentable: false,
        required: false,
        system: false,
        type: 'bool',
      })
    );

    return app.save(collection);
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3161059916');

    // remove field
    collection.fields.removeById('bool2063623452');

    return app.save(collection);
  }
);
