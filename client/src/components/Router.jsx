import React from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import App from './App.jsx';

export default function Router(){
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/pet/:petId"
          element={<App />}
        />
        <Route
          path="*"
          element={<Navigate to="/pet/62f3cb65936a1fe01a4c960b" />}
        />
      </Routes>
    </BrowserRouter>
  );
};
//* in line 14 has special meaning here, it will match only when no other routes do.
// sometimes, you can see /, here means home page, then path ="somethingElse",
//then element will be under page /somethingElse.