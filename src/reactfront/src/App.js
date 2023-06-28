import './App.css';

import AuthUser from './components/AuthUser';
import Admin from './navigation/Admin';
import Guest from './navigation/Guest';


function App() {

  const { getToken } = AuthUser();
  
  if (!getToken()) {
    return <Guest />
  }
  else {
    return <Admin />;
  }
}

export default App;
