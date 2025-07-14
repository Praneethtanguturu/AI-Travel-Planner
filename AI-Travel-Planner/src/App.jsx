import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Button } from "@/components/ui/button"
import Header from "./components/custom/Header"
import Hero from "./components/custom/Hero"
import CreateTrip from "./create-trip/index.jsx";
import Viewtrip from './view-trip/[tripId]/index.jsx'

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/create-trip" element={<CreateTrip />} />
        <Route path="/view-trip/:tripId" element={<Viewtrip />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App