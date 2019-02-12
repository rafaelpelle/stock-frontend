import * as React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route } from 'react-router'
import HomePage from '../pages/homePage'
import RegisterPage from '../pages/registerPage'
import DepositPage from '../pages/depositPage'
import WithdrawPage from '../pages/withdrawPage'
import { RootReducerInterface } from '../interfaces/reduxInterfaces'


class MyRoutes extends React.Component<Props, State> {
	render() {
		return (
			<div style={ routesStyle }>
				<Route exact={ true } path='/' component={ HomePage } />
				<Route path='/register' component={ RegisterPage } />
				<Route path='/deposit' component={ DepositPage } />
				<Route path='/withdraw' component={ WithdrawPage } />
			</div>
		)
	}
}
const mapStateToProps = (state: RootReducerInterface) => ({ })
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ }, dispatch)
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(MyRoutes)

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState

/////////////////////////////////////////////////////////////////
///////////////////////////// STYLE ////////////////////////////
/////////////////////////////////////////////////////////////////

const routesStyle = {
	paddingTop: '70px',
}
