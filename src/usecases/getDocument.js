const getDocument = async (documentRepository, id) => {
    return await documentRepository.fetchDocument(id);
};
  
export default getDocument; 