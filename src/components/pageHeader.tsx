import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { history } from '../router/history'
import { Grid, Icon, Menu } from 'semantic-ui-react'
import { RootReducerInterface } from '../interfaces/reduxInterfaces'

class PageHeader extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { homeActive: true, registerActive: false, depositActive: false, withdrawActive: false }
	}

	handleHomeClick = () => {
		this.setState({ homeActive: true, registerActive: false, depositActive: false, withdrawActive: false })
		history.push('/')
	}

	handleRegisterClick = () => {
		this.setState({ homeActive: false, registerActive: true, depositActive: false, withdrawActive: false })
		history.push('/register')
	}

	handleDepositClick = () => {
		this.setState({ homeActive: false, registerActive: false, depositActive: true, withdrawActive: false })
		history.push('/deposit')
	}

	handleWithdrawClick = () => {
		this.setState({ homeActive: false, registerActive: false, depositActive: false, withdrawActive: true })
		history.push('/withdraw')
	}

	render() {
		const { homeActive, registerActive, depositActive, withdrawActive } = this.state
		return (
			<Grid
				as={ Menu }
				fixed='top'
				verticalAlign='middle'
				textAlign='center'
				icon='labeled'
				stackable={ false }
				style={ menuStyle }
				inverted
			>
				<Menu.Item active={ homeActive } onClick={ this.handleHomeClick }>
					<Icon name='home'/>
					Home
				</Menu.Item>
				<Menu.Item active={ registerActive } onClick={ this.handleRegisterClick }>
					<Icon name='sign in'/>
					Register
				</Menu.Item>
				<Menu.Item active={ depositActive } onClick={ this.handleDepositClick }>
					<Icon name='money'/>
					Deposit
				</Menu.Item>
				<Menu.Item active={ withdrawActive } onClick={ this.handleWithdrawClick }>
					<Icon name='money bill alternate outline'/>
					Withdraw
				</Menu.Item>
			</Grid>
		)
	}
}

const mapStateToProps = (state: RootReducerInterface) => ({ })
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ }, dispatch)
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(PageHeader)

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {
	homeActive: boolean,
	registerActive: boolean,
	depositActive: boolean,
	withdrawActive: boolean,
}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState

/////////////////////////////////////////////////////////////////
///////////////////////////// STYLES ////////////////////////////
/////////////////////////////////////////////////////////////////
const menuStyle = {
	backgroundColor: '#2453a2',
	height: '70px',
}


