import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import HeaderComponent from './components/Header';
import LoginPage from './pages/Login';
import { ErrorContextProvider, ErrorDisplayComponent } from './components/Core/Error';
import { ComposeProviders } from './components/Core/Providers';
import LoginCallbackPage from './pages/Callback';
import { LoginRequiredRoute } from './components/Auth/Route';
import { UserProfilePage } from './pages/UserProfilePage';
import { AuthContextProvider } from './components/Auth/Auth';

function App() {
  return (
    <div>
      <ComposeProviders
        components={[
          AuthContextProvider,
          ErrorContextProvider,
        ]}
      >
        <BrowserRouter
        >
          <div className="App">
            <HeaderComponent></HeaderComponent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/callback" element={<LoginCallbackPage />} />
              <Route path="/private" element={<LoginRequiredRoute />}>
                <Route path="user">
                  <Route path="profile" element={<UserProfilePage />} />
                </Route>
              </Route>
              <Route path="*" element={<h1>Not Found Page</h1>} />
            </Routes>
            <Routes></Routes>
            <ErrorDisplayComponent />
          </div>
        </BrowserRouter>
      </ComposeProviders>

    </div>

  );
}

export default App;
