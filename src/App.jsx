//integrated implementation upto select role page
/*
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import AuthPage from "./pages/AuthPage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RolePage from "./pages/RolePage";
import Home from "./pages/Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/signup" element={<AuthPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
         <Route path="/select-role" element={<RolePage />} />
         <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
  

export default App; 
*/

//single reset password page implementation
/*
import ResetPassword from "./pages/ResetPassword";

function App() {
  return <ResetPassword />;
}

export default App;
*/
// single sing up page implementation
/*
import Navbar from "./pages/Navbar";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <>
      <Navbar />
      <AuthPage />
    </>
  );
}

export default App;
*/
//single homepage
// App.jsx
/*
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/
/*
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RolePage from "./pages/RolePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/select-role" element={<RolePage />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
*/
//single donor implementation
/*
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Requests from "./pages/Requests";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DashboardLayout from "./layouts/DashboardLayout";

function Page({ children }) { return <DashboardLayout>{children}</DashboardLayout>; }

export default function App() {
  return <Routes>
    <Route path="/" element={<Register/>}/>
    <Route path="/dashboard" element={<Page><Dashboard/></Page>}/>
    <Route path="/history" element={<Page><History/></Page>}/>
    <Route path="/requests" element={<Page><Requests/></Page>}/>
    <Route path="/profile" element={<Page><Profile/></Page>}/>
    <Route path="/settings" element={<Page><Settings/></Page>}/>
    <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
  </Routes>;
}
  */
 import { Routes, Route, Navigate } from "react-router-dom";

// Existing pages
import AuthPage from "./pages/AuthPage";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RolePage from "./pages/RolePage";
import Home from "./pages/Home";

// Dashboard pages
import Register from "./pages/Register";
import ReceiverRegister from "./pages/ReceiverRegister";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import Requests from "./pages/Requests";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import DashboardLayout from "./layouts/DashboardLayout";

// Receiver dashboard pages
import ReceiverLayout from "./components/receiver/Layout";
import ReceiverDashboard from "./pages/receiver/Dashboard";
import ReceiverSearchDonors from "./pages/receiver/SearchDonors";
import ReceiverSendRequest from "./pages/receiver/SendRequest";
import ReceiverMyRequests from "./pages/receiver/MyRequests";
import ReceiverReceivedDonations from "./pages/receiver/ReceivedDonations";
import ReceiverProfile from "./pages/receiver/Profile";
import ReceiverHelp from "./pages/receiver/Help";
import ReceiverSettings from "./pages/receiver/Settings";

function Page({ children }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

function ReceiverPage({ children }) {
  const isRegistered = localStorage.getItem("hemolink_receiver");
  if (!isRegistered) {
    return <Navigate to="/receiver-register" replace />;
  }
  return <ReceiverLayout>{children}</ReceiverLayout>;
}

function App() {
  return (
    <Routes>

      {/* ================= EXISTING PAGES ================= */}

      <Route path="/" element={<AuthPage />} />

      <Route path="/signup" element={<AuthPage />} />

      <Route path="/Login" element={<Login />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/reset-password" element={<ResetPassword />} />

      <Route path="/select-role" element={<RolePage />} />

      <Route path="/Home" element={<Home />} />


      {/* ================= DASHBOARD PAGES ================= */}

      <Route path="/register" element={<Register />} />

      <Route path="/receiver-register" element={<ReceiverRegister />} />

      <Route
        path="/dashboard"
        element={
          <Page>
            <Dashboard />
          </Page>
        }
      />

      <Route
        path="/history"
        element={
          <Page>
            <History />
          </Page>
        }
      />

      <Route
        path="/requests"
        element={
          <Page>
            <Requests />
          </Page>
        }
      />

      <Route
        path="/profile"
        element={
          <Page>
            <Profile />
          </Page>
        }
      />

      <Route
        path="/settings"
        element={
          <Page>
            <Settings />
          </Page>
        }
      />

      {/* ================= RECEIVER DASHBOARD PAGES ================= */}

      <Route
        path="/receiver/dashboard"
        element={
          <ReceiverPage>
            <ReceiverDashboard />
          </ReceiverPage>
        }
      />

      <Route
        path="/receiver/search-donors"
        element={
          <ReceiverPage>
            <ReceiverSearchDonors />
          </ReceiverPage>
        }
      />

      <Route
        path="/receiver/send-request"
        element={
          <ReceiverPage>
            <ReceiverSendRequest />
          </ReceiverPage>
        }
      />

      <Route
        path="/receiver/my-requests"
        element={
          <ReceiverPage>
            <ReceiverMyRequests />
          </ReceiverPage>
        }
      />

      <Route
        path="/receiver/received-donations"
        element={
          <ReceiverPage>
            <ReceiverReceivedDonations />
          </ReceiverPage>
        }
      />

      <Route
        path="/receiver/profile"
        element={
          <ReceiverPage>
            <ReceiverProfile />
          </ReceiverPage>
        }
      />

      <Route
        path="/receiver/help"
        element={
          <ReceiverPage>
            <ReceiverHelp />
          </ReceiverPage>
        }
      />

      <Route
        path="/receiver/settings"
        element={
          <ReceiverPage>
            <ReceiverSettings />
          </ReceiverPage>
        }
      />

      {/* Unknown URL */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;