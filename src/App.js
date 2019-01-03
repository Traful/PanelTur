import React, { Component } from "react";
import { Consumer } from "./context";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Menu from "./components/layout/Menu";
import ToTop from "./components/utiles/ToTop";
import Zonas from "./components/paginas/Zonas";
import Localidades from "./components/paginas/Localidades";
import Atractivos from "./components/paginas/Atractivos";
import Oficinas from "./components/paginas/Oficinas";
import Novedades from "./components/paginas/Novedades";
import Eventos from "./components/paginas/Eventos";
import Login from "./components/paginas/Login";


//<Router basename={`/${process.env.REACT_APP_BASENAME}`} history={Router.hashHistory}>

const NoFound = () => {
	return(<div>
		<p><h1>Error 404</h1></p>
		<p>Página no encontrada</p>
	</div>);
}

class App extends Component {
	constructor(props) {
        super(props);
        this.state = {
			loading: true,
			authorized: false
		};
		this.okLogin = this.okLogin.bind(this);
	}

	okLogin() {
		this.setState({
			authorized: true
		});
	}

	render() {
		const authorized = this.state.authorized;
		return (
			<React.Fragment>
				{
					authorized ?
					<Router history={Router.hashHistory}>
						<React.Fragment>
							<Navbar />
							<Menu />
							<div className="container">
								<div className="row">
									<div className="col">
										<Switch>
											<Route exact path="/" component={Zonas} />
											<Route path="/localidades" component={Localidades} />
											<Route path="/atractivos" component={Atractivos} />
											<Route path="/oficinas" component={Oficinas} />
											<Route path="/novedades" component={Novedades} />
											<Route path="/eventos" component={Eventos} />
											<Route component={NoFound} />
										</Switch>
									</div>
								</div>
							</div>
							<ToTop showAt={400} />
						</React.Fragment>
					</Router>
					:
					<Login okLogin={this.okLogin} />
				}
			</React.Fragment>
		);
	}
}

App.contextType = Consumer;

export default App;
