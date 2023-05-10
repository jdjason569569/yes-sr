import './App.css';

import { MyRoutes } from './routes/routes';
import LogoutOnClose from './utils/logoutOnClose';

function App() {
  return (
    <div className="App">
      <LogoutOnClose />
      <MyRoutes />
    </div>
  );
}

export default App;
