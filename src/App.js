import './App.css';
import MainPage from './presentation/pages/MainPage';
import DocumentDetailPage from './presentation/pages/DocumentDetailPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/documents/:id" element={<DocumentDetailPage />} />
    </Routes>
  );
}

export default App;
