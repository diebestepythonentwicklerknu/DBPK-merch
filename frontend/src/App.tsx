import "./App.scss";
import { Outlet } from "react-router-dom";
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

function App() {
  return (
      <div className="wrapper">
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
  );
}

export default App;
