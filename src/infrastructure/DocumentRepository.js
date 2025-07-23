import Document from "../domain/Document";

const API_URL = "http://localhost:8000/documents/";

const DocumentRepository = {
  fetchDocuments: async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch documents");

    const data = await response.json();

    return data.map(
      (doc) =>
        new Document({
          id: doc.id,
          name: doc.name,
          category: doc.category,
          text: doc.text,
          entities: doc.entities,
          imageUrl: doc.image,
        })
    );
  },
  fetchDocument: async (id) => {
    const response = await fetch(`${API_URL}${id}/`);
    if (!response.ok) throw new Error("Failed to fetch document");

    const data = await response.json();

    const doc = new Document({
      id: data.id,
      name: data.name,
      category: data.category,
      text: data.text,
      entities: data.entities,
      imageUrl: data.image,
    });
    return doc;
  },
  updateDocument: async (id, body) => {
    const response = await fetch(`${API_URL}${id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: body,
    });
    if (!response.ok) throw new Error("Failed to update document");
    return await response.json();
  },
  deleteDocument: async (id) => {
    const response = await fetch(`${API_URL}${id}/`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete document");
    return true;
  },
  uploadDocument: async (file, name) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) throw new Error("Failed to upload document");
    return await response.json();
  },
};

export default DocumentRepository;
