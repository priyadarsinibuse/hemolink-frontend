import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/receiver-app.css';

const Layout = ({ children }) => {
  return (
    <div className="receiver-app app-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
