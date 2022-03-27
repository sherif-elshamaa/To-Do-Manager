import 'bootstrap/dist/css/bootstrap.min.css';
import TasksList from './components/TasksList'
import Toaster from './components/Toaster'

function App() {
  return (
    <div className="App" style={{ maxWidth: "800px", margin: "auto" }}>
      <main className="App-header">
        <TasksList />
        <Toaster />
      </main>
    </div>
  );
}

export default App;
