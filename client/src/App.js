import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import {
  Landing,
  LoginPage,
  RegisterPage,
  MakeReservation,
  ZoneAdmin,
  RequestResetPassword,
  ResetPassword,
} from "./components";
import { ZoneA, ZoneB, ZoneC } from "./components/Zones";
import {
  dashboard,
  Availability,
  Help,
  Quicksetup,
  Reports,
  Reservation,
  Schedule,
  Sitesettings,
  Users,
  Resources,
  Subscription,
} from "./components/Admin";
import {
  Home,
  Offers,
  userHelp,
  Reservations,
  Payments,
  Settings,
} from "./components/Profile";
import Auth from "./auth/middleware/auth";

// null   Anyone can access route
// true   only logged in users can access route
// false  logged in user can't access route

function App() {
  // Perform code-Splitting to enable lazy load on frequently access routes

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Auth(Landing, null)} />
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route
            path="/request_reset_password"
            component={Auth(RequestResetPassword, false)}
          />
          <Route
            path="/reset_password/:id"
            component={Auth(ResetPassword, false)}
          />
          <Route path="/reservation" component={Auth(MakeReservation, null)} />
          <Route path="/zones/zone-a" component={Auth(ZoneA, null)} />
          <Route path="/zones/zone-b" component={Auth(ZoneB, null)} />
          <Route path="/zones/zone-c" component={Auth(ZoneC, null)} />
          <Route path="/zones/admin" component={Auth(ZoneAdmin, true)} />
          <Route path="/admin/dashboard" component={dashboard} />
          <Route path="/admin/reservations" component={Reservation} />
          <Route path="/admin/help" component={Help} />
          <Route path="/admin/quick-setup" component={Quicksetup} />
          <Route path="/admin/reports" component={Reports} />
          <Route path="/admin/resources" component={Resources} />
          <Route path="/admin/site-settings" component={Sitesettings} />
          <Route path="/admin/subscription" component={Subscription} />
          <Route path="/admin/users" component={Users} />
          <Route path="/admin/schedule" component={Schedule} />
          <Route path="/admin/availability" component={Availability} />
          <Route path="/user-profile/dashboard" component={Home} />
          <Route path="/user-profile/reservations" component={Reservations} />
          <Route path="/user-profile/offers" component={Offers} />
          <Route path="/user-profile/payments" component={Payments} />
          <Route path="/user-profile/settings" component={Settings} />
          <Route path="/user-profile/help" component={userHelp} />
          <Route
            path="/payment"
            component={() => {
              global.window &&
                (global.window.location.href =
                  "https://ravesandbox.flutterwave.com/pay/x46g8vnqpvgh");
              return null;
            }}
          />
        </Switch>
      </div>
    </Suspense>
  );
}

export default App;
