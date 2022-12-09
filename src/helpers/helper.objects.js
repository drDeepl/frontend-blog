export const copyObjectProperty = function (obj) {
  const props = Object.keys(obj);
  let newObj = {};
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];

    newObj[prop] = '';
  }
  console.error(newObj);
  return newObj;
};
