import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import DocumentRepository from "../../infrastructure/DocumentRepository";
import getDocument from "../../usecases/getDocument";
import updateDocument from "../../usecases/updateDocument";
import deleteDocument from "../../usecases/deleteDocument";

const DocumentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", entities: "" });
  const [entitiesError, setEntitiesError] = useState("");
  const categories = location.state?.categories || [];

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const doc = await getDocument(DocumentRepository, id);
        if (!doc) throw new Error("Document not found");
        setDocument(doc);
        setForm({
          name: doc.name,
          category: doc.category,
          entities: doc.entities ? JSON.stringify(doc.entities, null, 2) : "",
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.name === "entities") setEntitiesError("");
  };

  const handleSave = async () => {
    let parsedEntities = null;
    if (form.entities) {
      try {
        parsedEntities = JSON.parse(form.entities);
      } catch (e) {
        setEntitiesError("Entities must be valid JSON");
        return;
      }
    }
    setSaving(true);
    setError(null);
    try {
      await updateDocument(DocumentRepository, id, form, parsedEntities);
      navigate("/");
    } catch (err) {
      setError("Failed to save: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setError(null);
    setSaving(true);
    try {
      await deleteDocument(DocumentRepository, id);
      navigate("/");
    } catch (err) {
      setError("Failed to delete: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <Container sx={{ mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  if (error)
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  if (!document) return null;

  return (
    <Container sx={{ mt: 4 }}>
      <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mb: 2 }}>
        Back
      </Button>
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={document.imageUrl}
          alt={document.name}
        />
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Edit Document
          </Typography>
          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              name="category"
              value={form.category}
              label="Category"
              onChange={handleChange}
            >
              {categories.map((cat) => (
                <MenuItem key={cat.value} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Entities (JSON)"
            name="entities"
            value={form.entities}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            minRows={4}
            error={!!entitiesError}
            helperText={entitiesError || "Paste valid JSON here"}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            disabled={saving}
            sx={{ mt: 2, mr: 2 }}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={handleDelete}
            disabled={saving}
            sx={{ mt: 2 }}
          >
            Delete
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};

export default DocumentDetailPage;
