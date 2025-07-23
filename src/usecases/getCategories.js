const getCategories = async (categoryRepository) => {
    return await categoryRepository.fetchCategories();
  };
  
  export default getCategories; 