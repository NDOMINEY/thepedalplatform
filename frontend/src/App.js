import styles from './App.module.css';
import NavBar from './components/NavBar';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Landing from './components/Landing';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";


function App() {
    return (
        <div>
            <NavBar />
            <div className={styles.Content}>
                <Switch>
                    <Route exact path="/" render={() =>
                        <Landing />
                    } />
                    <Route exact path="/products" render={() => <Products />} />
                    <Route exact path="/products/:id" render={() => <ProductDetail />} />
                    <Route exact path="/login" render={() => <LoginForm />} />
                    <Route exact path="/register" render={() => <RegisterForm />} />
                    <Route render={() => <p>Page not found!</p>} />
                </Switch>
            </div>
        </div>
    );
}

export default App;