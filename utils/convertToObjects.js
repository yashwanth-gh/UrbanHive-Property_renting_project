export function convertToSerializableObjects(leanDocuments) {
  for (const key of Object.keys(leanDocuments)) {
    if (leanDocuments[key].toJSON && leanDocuments[key].toString) {
      leanDocuments[key] = leanDocuments[key].toString();
    }
  }
  return leanDocuments;
}
