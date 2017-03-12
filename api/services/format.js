module.exports.schema = function (schema) {
  Object.keys(schema).forEach(function (schemaKey) {
    delete schema[schemaKey].title;
    delete schema[schemaKey].items;
    delete schema[schemaKey].uniqueItems;
    delete schema[schemaKey].maxItems;
    delete schema[schemaKey].minItems;
      delete schema[schemaKey].help;
      delete schema[schemaKey].description;
  });
  return schema;
};
