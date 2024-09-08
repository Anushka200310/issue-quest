import Header from "./components/Header";
import { ThemeProvider } from "./components/theme-provider";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Header />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
