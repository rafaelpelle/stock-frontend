import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Menu } from 'semantic-ui-react'
import { RootReducerInterface } from '../interfaces/reduxInterfaces'



class WithdrawPage extends React.Component<Props, State> {
	render() {
		return (
			<h1>Withdraw</h1>
		)
	}
}

const mapStateToProps = (state: RootReducerInterface) => ({ })
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ }, dispatch)
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(WithdrawPage)

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState