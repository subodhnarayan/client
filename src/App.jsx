import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/footer/footer";
import { Error } from "./pages/Error"; // Import Error component
import { useAuth } from "./store/auth";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminUpdate } from "./pages/Admin-Update";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} /> {/* Catch-all route for 404 */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
