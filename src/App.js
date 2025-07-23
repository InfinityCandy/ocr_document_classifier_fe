import './App.css';
import MainPage from './presentation/pages/MainPage';
import DocumentDetailPage from './presentation/pages/DocumentDetailPage';
import AddDocumentPage from './presentation/pages/AddDocumentPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/documents/:id" element={<DocumentDetailPage />} />
      <Route path="/add-document" element={<AddDocumentPage />} />
    </Routes>
  );
}

export default App;
