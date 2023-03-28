import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import FavoritePage from "./pages/FavoritePage";
import Navigation from "./components/Navigation";

function App() {
	return (
		<>
			<Navigation />
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/favorite" element={<FavoritePage />} />
			</Routes>
		</>
	);
}

export default App;
