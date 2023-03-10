export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export function validUserName(name) {
  var name_map = ['admin', 'editor'];
  return name_map.indexOf(name.trim()) >= 0;
}
