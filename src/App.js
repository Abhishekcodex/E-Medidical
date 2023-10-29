import { BrowserRouter } from 'react-router-dom';
import './App.css';
import RedirectRoutes from './containers/routes';
function App() {
  return (
    <BrowserRouter>
      <RedirectRoutes />
    </BrowserRouter>
  );
}

export default App;
