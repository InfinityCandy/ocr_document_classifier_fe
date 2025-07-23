// Use case to get documents
const getDocuments = async (documentRepository) => {
  return await documentRepository.fetchDocuments();
};

export default getDocuments; 