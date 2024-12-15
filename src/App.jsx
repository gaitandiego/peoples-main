import { ToastContainer } from "react-toastify"
import { BrowserRouter, Route, Routes } from 'react-router';

import Header from "./components/header/Header"
import "react-toastify/dist/ReactToastify.css";
import * as ROUTES from './constants/routes';
import PeoplesHomePage from "./pages/peoples/home/HomePage";
import PeoplesEditPage from "./pages/peoples/edit/EditPage";
import PeoplesAddPage from "./pages/peoples/add/AddPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={ROUTES.PEOPLES_HOME} element={<PeoplesHomePage />} />
        <Route path={ROUTES.PEOPLES_ADD} element={<PeoplesAddPage />} />
        <Route path={ROUTES.PEOPLES_EDIT} element={<PeoplesEditPage />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App