import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';

import Layout from 'components/Layout';
import ProtectedRoute from 'components/ProtectedRoute';
import Login from 'pages/Login';
import RoundsList from 'pages/RoundsList';
import RoundPage from 'pages/RoundPage';

import path from "constants/path.ts";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={path.login} element={<Login/>}/>
                <Route
                    path={path.root}
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <RoundsList/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path={path.roundId(':id')}
                    element={
                        <ProtectedRoute>
                            <Layout>
                                <RoundPage/>
                            </Layout>
                        </ProtectedRoute>
                    }
                />
                <Route path={path.all} element={<Navigate to={path.root} replace/>}/>
            </Routes>
        </BrowserRouter>)
}

export default Router;
