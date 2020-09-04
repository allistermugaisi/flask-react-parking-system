import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import {
  Landing,
  LoginPage,
  RegisterPage,
  MakeReservation,
  Profile,
  ZoneAdmin,
} from "./components";
import { ZoneA, ZoneB, ZoneC } from "./components/Zones";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/reservation" component={MakeReservation} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/zones/zone-a" component={ZoneA} />
          <Route exact path="/zones/zone-b" component={ZoneB} />
          <Route exact path="/zones/zone-c" component={ZoneC} />
          <Route exact path="/zones/admin" component={ZoneAdmin} />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
