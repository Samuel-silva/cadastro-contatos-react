import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import FormPage from "../pages/FormPage";
import { Navigate } from 'react-router-dom';

export default function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/new-register" element={<FormPage />} />
			<Route path="/edit/:id" element={<FormPage />} />
			<Route path='/404' element={<PageNotFound/>} />
			<Route path='*' element={<Navigate replace to='/404'/>} />
		</Routes>
	);
}
