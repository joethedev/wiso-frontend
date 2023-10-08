import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavigationBar from "./components/NavigationBar";
import MonthlySalaryCalculator from "./components/MonthlySalaryCalculator";
import TaxSlicesTable from "./components/TaxSlicesTable";
import SideBar from "./components/SideBar";
import AddNewSlice from "./components/AddNewSlice";

function App() {
  return (
    <>
      <NavigationBar />
      <div className="main">
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculate" element={<MonthlySalaryCalculator />} />
          <Route path="/tax-slices" element={<TaxSlicesTable />} />
          <Route path="/add" element={<AddNewSlice />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
