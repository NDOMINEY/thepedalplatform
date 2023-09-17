import styles from './App.module.css';
import NavBar from './components/NavBar';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Landing from './components/Landing';
import Container from "react-bootstrap/Container";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";



function App() {
    return (
        <CurrentUserContext.Provider value={currentUser}>
            <SetCurrentUserContext.Provider value={setCurrentUser}>
                <div className={styles.App}>
                    <NavBar />
                    <Container className={styles.Content}>
                        <Switch>
                            <Route exact path="/" render={() =>
                                <Landing />
                            } />
                            <Route exact path="/products" render={() => <h1>Products</h1>} />
                            <Route exact path="/login" render={() => <LoginForm />} />
                            <Route exact path="/register" render={() => <RegisterForm />} />
                            <Route render={() => <p>Page not found!</p>} />
                        </Switch>
                    </Container>
                </div>
            </SetCurrentUserContext.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;