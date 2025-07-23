import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, CircularProgress, Alert, Box } from '@mui/material';
import DocumentRepository from '../../infrastructure/DocumentRepository';

const AddDocumentPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await DocumentRepository.uploadDocument(file);
      navigate('/');
    } catch (err) {
      setError('Failed to upload document: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container sx={{ mt: 4, display: 'flex'}}>
      <Box sx={{ width: 400 }}>
        <Typography variant="h5" gutterBottom>Add Document</Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <input type="file" accept="image/*,.pdf,.doc,.docx,.txt" onChange={handleFileChange} />
          </Box>
          {previewUrl && (
            <Box mb={2}>
              <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, display: 'block' }} />
            </Box>
          )}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            Save
          </Button>
          {loading && <CircularProgress sx={{ ml: 2 }} />}
        </form>
      </Box>
    </Container>
  );
};

export default AddDocumentPage; 