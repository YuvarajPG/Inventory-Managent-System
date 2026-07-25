import AvailableProducts from "./components/AvailableProducts";
import Navbar from "./components/ui/Navbar";
function App() {
  return (
    <main className="flex flex-col text-center">
      <Navbar />
      <AvailableProducts />
    </main>
  );
}

export default App;
