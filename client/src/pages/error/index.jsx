import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import Layout from "../layout";

const error = () => {

    return (
        <ProtectedRoute>
            <Layout>
             <h1>An error occurred. Please try again.</h1>
            </Layout>
        </ProtectedRoute>
    )
   
}

export default error;