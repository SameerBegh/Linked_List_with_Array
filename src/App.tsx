import "./App.css"
import LinkedList from "./components/LinkedList";
import Navbar from "./components/NavBar";
import DataProvider from "./context/DataContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Navbar />
        <div className="App_container">
        <LinkedList />
        <ToastContainer/>
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
