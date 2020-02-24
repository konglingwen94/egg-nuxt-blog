const mongoose = require('mongoose')
module.exports = {
  fieldSchemaRules: {
    tagIdList: {
      type: 'array',
      itemType: 'objectId',
      min: 1,
    },
    categoryIdList:{
      type:'array',
      itemType:'objectId',
      min:1
    },
    categoryID:{
      type:''
    }
  },
}
