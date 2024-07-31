import './App.css';
import './index.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HeaderComponent from './components/HeaderComponent';
import ListUserComponent from './components/ListStudentComponent';
import UserComponent from './components/StudentComponent';
import NotFoundComponent from './components/NotFoundComponent';
import StudentDetailComponent from './components/StudentDetailComponent';
import Login from './components/Login';
import Signup from './components/SignUp';
import Layout from './components/Layout';
import SignIn from './components/SignIn';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListUserComponent />} />
          <Route path="student" element={<ListUserComponent />} />
          <Route path="student/add" element={<UserComponent />} />
          <Route path="student/edit/:id" element={<UserComponent />} />
          <Route path="student/:id" element={<StudentDetailComponent />} />
        </Route>
        <Route path="/login" element={ <Login />} />
        <Route path="/signup" element={ <Signup />} />
        <Route path="/signin" element={ <SignIn />} />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
