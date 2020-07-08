export const getModalText = (isEditMode, type) => {
  return isEditMode ? `Edit ${type}` : `Add ${type}`;
};

export const transformCollectionSnapshot = (snapshot, setData) => {
  const data = [];
  snapshot.forEach((doc) => data.push(doc.data()));
  setData(data);
};

export const handleKeyDown = (event, action) => {
  (event.which === 13 || event.which === 32) && action();
};

export const isFileImage = (file) => {
  const acceptedImageTypes = ['image/jpeg', 'image/png'];
  return file && acceptedImageTypes.includes(file.type);
};
