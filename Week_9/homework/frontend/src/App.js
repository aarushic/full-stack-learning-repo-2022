import { Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/Layouts/DefaultLayout";
import FullScreenLayout from "./components/Layouts/FullScreenLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AuthContext, { useProvideAuth } from "./contexts/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ExportPage from "./pages/ExportPage";
import UploadPage from "./pages/UploadPage";




function App() {
  return (
    <AuthContext.Provider value={useProvideAuth()}>
      <Routes>
        <Route path="/" element={<DefaultLayout></DefaultLayout>}>
          <Route index element={<HomePage></HomePage>}></Route>
        </Route>
        <Route path="/login" element={<FullScreenLayout></FullScreenLayout>}>
          <Route index element={<LoginPage></LoginPage>}></Route>
        </Route>
        <Route path="/register" element={<FullScreenLayout></FullScreenLayout>}>
          <Route index element={<RegisterPage></RegisterPage>}></Route>
        </Route>
        <Route path="/profilepic" element={<FullScreenLayout></FullScreenLayout>}>
          <Route index element={<ProfilePage></ProfilePage>}></Route>
        </Route>
        <Route path="/export" element={<FullScreenLayout></FullScreenLayout>}>
          <Route index element={<ExportPage></ExportPage>}></Route>
        </Route>
        <Route path="/upload" element={<FullScreenLayout></FullScreenLayout>}>
          <Route index element={<UploadPage></UploadPage>}></Route>
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
