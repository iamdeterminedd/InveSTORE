import { Route, Routes } from 'react-router-dom';
import { AuthWrapper } from './context/AuthWrapper';
import { Home } from './components/Home';
import Inventory from './components/Inventory';
import Login from './components/Login';
import PageNotFound from './components/PageNotFound';
import PrivateRoutes from './utils/PrivateRoutes';
import AddItem from './components/AddItem';
import UpdateItem from './components/UpdateItem';

function App() {
  return (
    <>
      <AuthWrapper>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home />}>
              <Route index element={<Inventory />} />
              <Route path="/add/item" element={<AddItem />} />
              <Route path="/update/item/:id" element={<UpdateItem />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AuthWrapper>
    </>
  );
}

export default App;
