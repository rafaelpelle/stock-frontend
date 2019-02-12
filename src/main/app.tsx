import * as React from 'react'
import { history } from '../router/history'
import { Router, Switch } from 'react-router'
import MyRoutes from '../router/myRoutes'
import PageHeader from '../components/pageHeader'
require('./app.css')

class App extends React.Component<Props, State> {
    render() {
	    return (
            <Router history={ history }>
				<div>
					<PageHeader/>
					<Switch>
						<MyRoutes/>
					</Switch>
				</div>
			</Router>
        )
    }
}
export default App

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState
