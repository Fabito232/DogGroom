
import Lista_productos from './lista_productos';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<Lista_productos />} />
          </Routes>
      </Router>
  );
}
export default App
