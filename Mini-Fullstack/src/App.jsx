import './App.css';

import 'rsuite/dist/rsuite.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import PrivateRoutes from './components/utils/privateroute';
import { UserProvider } from './UserContext';



function App() {

  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}
export default App;
