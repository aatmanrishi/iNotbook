import './App.css';
import { Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { NotesProvider } from './context/notes/NoteState';

function App() {
  return (
    <>
      <NotesProvider>
        <Router>
          <Navbar />
          <Alert message="This is amazing React course" />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </Router>
      </NotesProvider>
    </>
  );
}

export default App;
