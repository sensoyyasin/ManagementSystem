import './App.css';
import './index.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListUserComponent from './components/ListStudentComponent';
import UserComponent from './components/StudentComponent';
import NotFoundComponent from './components/NotFoundComponent';
import StudentDetailComponent from './components/StudentDetailComponent';
import Login from './components/Login';
import Signup from './components/SignUp';
import SignIn from './components/SignIn';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedRoute from './components/ProtectedRoutes';
import HeaderWrapper from "./components/HeaderWrapper";

function App() {
    return (
        <BrowserRouter>
            <HeaderWrapper>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<ListUserComponent />} />
                        <Route path="student" element={<ListUserComponent />} />
                        <Route path="student/add" element={<UserComponent />} />
                        <Route path="student/edit/:id" element={<UserComponent />} />
                        <Route path="student/:id" element={<StudentDetailComponent />} />
                        <Route path="*" element={<NotFoundComponent />} />
                    </Route>
                </Routes>
            </HeaderWrapper>
        </BrowserRouter>
    );
}

export default App;
