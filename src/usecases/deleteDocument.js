// Use case to delete a document
const deleteDocument = async (documentRepository, id) => {
  return await documentRepository.deleteDocument(id);
};

export default deleteDocument; 