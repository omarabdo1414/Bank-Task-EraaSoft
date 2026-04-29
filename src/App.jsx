
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BankPage from './pages/BankPage';
import Form from './components/Form';
import { Toaster } from 'react-hot-toast';


const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Form />} />
					<Route path="/bank" element={<BankPage />} />
				</Routes>
			</BrowserRouter>
			<Toaster position="top-right" />
		</>
	);
};

export default App;
