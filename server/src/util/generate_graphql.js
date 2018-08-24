

const scriptArgs = process.argv.slice(2);
const [typeName, schemaName] = scriptArgs;


const Schema = require(`../database/models/${schemaName}`);

const getType = (key, value) => {
  const formatKey = (key) => {
    let formatted = `${key[0].toUpperCase() + key.substring(1)}`;
    formatted = formatted.endsWith('s') ? formatted.slice(0, -1) : formatted;
    return formatted;
  };

  const createType = (name, meta) => ({typeName: (name === 'Date' ? 'String' :
    name === 'Number' ? 'Integer' : name) + (value.required ? '!' : ''), meta});

  const handleArray = (value) => {
    value = value[0];
    if (value.ref) {
      return createType(`[${value.ref}]`, 'ref');
    } else {
      let formatted = formatKey(key);
      return Object.assign(createType(`[${formatted}]`, 'object'), {
        raw: {
          formatted,
          inner: value,
        },
      });
    }
  };

  switch (typeof value) {
  case 'function':
    return createType(value.name, 'scalar');
  case 'object':
    if (Array.isArray(value)) {
      return handleArray(value);
    } else {
      if (value.ref) {
        return createType(value.ref, 'ref');
      } else if (value.type) {
        return Array.isArray(value.type) ? handleArray(value.type) :
          createType(value.type.name, 'scalar');
      } else {
        throw new Error('Unknown object type');
      }
    }
  }
};


const buildFromSchemaDefinition = (name, definition, typeDefs = []) => {
  const properties = [];
  Object.keys(definition).forEach((key) => {
    const value = definition[key];
    const t = getType(key, value);
    if (t.raw) {
      buildFromSchemaDefinition(t.raw.formatted, t.raw.inner, typeDefs);
    }
    properties[properties.length] = ({keyName: key, keyType: t.typeName});
  });
  properties.push({keyName: '_id', keyType: 'ID!'});

  let x = '';
  properties.forEach((obj) => {
    x += `\t    ${obj.keyName}:${obj.keyType}` + '\n';
  });
  const str = `\ttype ${name} {\n${x}\t}`;
  typeDefs.push(str);
  return typeDefs;
};

buildFromSchemaDefinition(schemaName, Schema.default.obj).forEach((typeDef) => {
  console.log(typeDef);
});


