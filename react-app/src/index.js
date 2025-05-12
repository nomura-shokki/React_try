import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App';
import DataList from './DataList';
import EditForm from './EditForm';
import DeletePage from './DeletePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/data-list" element={<DataList />} />
        <Route path="/edit/:id" element={<EditForm />} />
        <Route path="/delete/:id" element={<DeletePage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
