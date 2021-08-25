
module.exports.models = {

  schema: true,
  migrate: 'alter',
  attributes: {
    createdAt: { type: 'number', autoCreatedAt: true, },
    updatedAt: { type: 'number', autoUpdatedAt: true, },
    id: { type: 'number', autoIncrement: true, },
     },

  dataEncryptionKeys: {
    default: 'GKhfW4eY+wT4XFOEWpHEStsYzI7DgolbeQJvsEl4Yog='
  },


  cascadeOnDestroy: true


};
