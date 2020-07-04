export const getModalText = (isEditMode, type) => {
  return isEditMode ? `Edit ${type}` : `Create New ${type}`;
};

export const transformCollectionSnapshot = (snapshot, setData) => {
  const data = [];
  snapshot.forEach((doc) => data.push(doc.data()));
  setData(data);
};
