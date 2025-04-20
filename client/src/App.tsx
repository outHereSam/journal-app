import { Outlet } from "react-router";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Header />
      <main className="flex gap-2 mx-auto max-w-3xl pt-16">
        <Sidebar />
        <Outlet />
      </main>
    </>
  );
}

export default App;
