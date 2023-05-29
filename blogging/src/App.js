import { useState } from "react";
import "./App.css";
import Login from "./components/account/Login";

import { Box } from "@mui/material";

import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import DataProvider from "./context/DataProvider";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
    const token = sessionStorage.getItem("accessToken");
    return isAuthenticated && token ? (
        <>
            <Header />
            <Outlet />
        </>
    ) : (
        <Navigate replace to="/account" />
    );
};
function App() {
    const [isAuthenticated, isUserAuthenticated] = useState(false);
    return (
        <DataProvider>
            <BrowserRouter>
                <Box style={{ marginTop: 64 }}>
                    <Routes>
                        <Route
                            path="/account"
                            element={
                                <Login
                                    isUserAuthenticated={isUserAuthenticated}
                                />
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <PrivateRoute
                                    isAuthenticated={isAuthenticated}
                                />
                            }
                        >
                            <Route path="/" element={<Home />} />
                        </Route>
                    </Routes>
                </Box>
            </BrowserRouter>
        </DataProvider>
    );
}

export default App;
