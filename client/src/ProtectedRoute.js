import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function ProtectedRoute({
	component: Component,
	isAuthenticated,
	role,
	...rest
}) {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (isAuthenticated && role === '1') {
					return <Component {...props} />;
				} else {
					return <Navigate to="/" />;
				}
			}}
		/>
	);
}

export default ProtectedRoute;
