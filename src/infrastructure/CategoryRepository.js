import Category from '../domain/Category';
import Document from '../domain/Category';

const API_URL = 'http://localhost:8000/categories/';

const CategoryRepository = {
  fetchCategories: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch categories');

    const data = await response.json();
    
    return data.map(cat => new Category({
      value: cat.value,
      label: cat.label
    }));
  },
};

export default CategoryRepository; 