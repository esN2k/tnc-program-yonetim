import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AttendeesPage from "./pages/AttendeesPage";
import { seedIfEmpty } from "./services/seed";

// Senkron çalışır: ilk render'daki useState(() => service.list()) çağrılarından
// önce localStorage'ın dolu olmasını garanti eder (useEffect içinde olsaydı geç kalırdı).
seedIfEmpty();

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<EventsPage />} />
          <Route path="events/:eventId" element={<EventDetailPage />} />
          <Route path="attendees" element={<AttendeesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}