import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import FormPage from "../pages/FormPage";

export default function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/new-register" element={<FormPage />} />
			<Route path="/edit/:id" element={<FormPage />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}
