export function exists(key, ary): boolean {
  const found = ary.find(p => p === key);
  return Boolean(found);
}
