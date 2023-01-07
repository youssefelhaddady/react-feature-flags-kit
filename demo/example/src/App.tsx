import './App.css';
import { Feature, FlagsProvider } from 'react-feature-flags-kit';
import flags from './flags.json';
function App() {
  return (
    <FlagsProvider features={flags}>
      <div className="App">
        <Feature flag="feat">this should be in Dom</Feature>
        <Feature flag="featDisabled">this shound be hidden</Feature>
      </div>
    </FlagsProvider>
  );
}

export default App;
