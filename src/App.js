import React, { Component } from "react";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Menu from "./components/layout/Menu";
import Zonas from "./components/paginas/Zonas";
import Localidades from "./components/paginas/Localidades";
import Atractivos from "./components/paginas/Atractivos";
import Fest from "./components/paginas/Fest";

import { Provider } from "./context";
//<Router basename={`/${process.env.REACT_APP_BASENAME}`} history={Router.hashHistory}></Router>

class App extends Component {
	render() {
	return (
		<Provider>
			<Router basename={`/${process.env.REACT_APP_BASENAME}`} history={Router.hashHistory}>
				<React.Fragment>
					<Navbar />
					<Menu />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Zonas} />
							<Route exact path="/localidades" component={Localidades} />
							<Route exact path="/atractivos" component={Atractivos} />
							<Route exact path="/fest" component={Fest} />
						</Switch>
					</div>
				</React.Fragment>
			</Router>
		</Provider>
	);
	}
}

export default App;
