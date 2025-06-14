// import './App.css'
import {BrowserRouter,Routes,Route}  from 'react-router-dom'
import { Login } from './components/Login';
import { NoteDetail } from './components/NoteDetail';
import { NoteList } from './components/NoteList';
import { NoteEdit } from './components/NoteEdit';
import { TestPage } from './components/TestPage';
import { createContext, useState } from 'react';
import { NoteCreate } from './components/NoteCreate';
import { RegisterPage } from './components/RegisterPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import { ErrorPage } from './components/ErrorPage';
import { ToastContainer } from 'react-toastify';

export const AppContext = createContext();

function App() {
  const [jwt,setJwt]=useState("");

  return (
    <div>
      <AppContext.Provider value={{jwt, setJwt}} >
        <BrowserRouter>
        <ToastContainer />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path='/register' element={<RegisterPage/>} />


            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<div>home</div>} ></Route>
              <Route path="/notes/:noteId" element={<NoteDetail />} />
              <Route path="/notes/:noteId/edit" element={<NoteEdit />} />
              <Route path="/notes" element={<NoteList />} />
              <Route path="/test" element={<TestPage />}/>
              <Route path="/create" element={<NoteCreate />}/>
            </Route>

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </div>
  )
}

export default App
