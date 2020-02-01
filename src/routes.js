import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Payment from "./pages/payment/Payment";

const AppRouter = () => {
  return (
    <Router>
      <MainLayout>
        <Route path="/" exact component={Payment} />
      </MainLayout>
    </Router>
  );
};

export default AppRouter;
