const updateDocument = async (documentRepository, id, updateData, entities) => {
    let body = {
        name: updateData.name,
        category: updateData.category,
        entities: entities,
    }
    body = JSON.stringify(body)

    return await documentRepository.updateDocument(id, body);
};
  
export default updateDocument; 