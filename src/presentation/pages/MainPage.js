import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardContent, CardMedia, CircularProgress, Alert, Button, Box } from '@mui/material';
import getDocuments from '../../usecases/getDocuments';
import getCategories from '../../usecases/getCategories';
import DocumentRepository from '../../infrastructure/DocumentRepository';
import CategoryRepository from '../../infrastructure/CategoryRepository';

const MainPage = () => {
  const [documents, setDocuments] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const docs = await getDocuments(DocumentRepository);
        setDocuments(docs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategories(CategoryRepository);
        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const getCategoryName = (category) => {
    return categories.find(cat => cat.value === category)?.label || category;
  }

  if (loading) return <Container sx={{ mt: 4 }}><CircularProgress /></Container>;
  if (error) return <Container sx={{ mt: 4 }}><Alert severity="error">{error}</Alert></Container>;

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/add-document')}>
          Add Document
        </Button>
      </Box>
      <Typography variant="h4" gutterBottom>Documents</Typography>
      <Grid container spacing={3}>
        {documents.map(doc => (
          <Grid item xs={12} sm={6} md={4} key={doc.id}>
            <Card onClick={() => navigate(`/documents/${doc.id}`, { state: { categories } })} sx={{ cursor: 'pointer' }}>
              <CardMedia
                component="img"
                height="140"
                //image={doc.imageUrl}
                alt={doc.name}
              />
              <CardContent>
                <Typography variant="h6">{doc.name}</Typography>
                <Typography variant="subtitle2" color="text.secondary">Category: {getCategoryName(doc.category)}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{doc.text}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MainPage; 