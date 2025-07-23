// Document entity
class Document {
  constructor({ id, name, category, text, entities, imageUrl }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.text = text;
    this.entities = entities;
    //this.imageUrl = imageUrl;
  }
}

export default Document; 