import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { axiosInstance } from '../utils/httpClient'
import { Button, Container, Form, Header, Label, Transition } from 'semantic-ui-react'
import { RootReducerInterface } from '../interfaces/reduxInterfaces'
import { WalletInterface } from '../interfaces/modelInterfaces'
import { handleBrazilianMoney } from '../utils/stringParser'
import { ChangeEvent } from 'react'
import MaskedInput from 'react-text-mask'

const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ]
const emptyWallet: WalletInterface = {
	id: 0,
	regularContribution: 0,
	additionalContribution: 0,
	portabilityContribution: 0,
	supplementaryPlanContribution: 0,
	insuranceCompanyContribution: 0,
	totalBalance: 0,
}


class FindUserPanel extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { loading: false, resultVisible: false, wallet: null, cpf: '' }
	}

	handleCPFChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ cpf: String(event.target.value).replace(/[^0-9]/g, '') })
	}

	handleFindWalletClick = async () => {
		this.setState({ loading: true })
		const { cpf, resultVisible } = this.state
		if (resultVisible) {
			this.setState({ loading: false, resultVisible: false })
		} else {
			try {
				const request = await axiosInstance.get(`/user/wallet/${cpf}`)
				console.log(request.data)
				this.setState({ wallet: request.data, loading: false, resultVisible: true })
			} catch (e) {
				console.log(e)
			}
		}
	}

	render() {
		const { loading, resultVisible, cpf, wallet } = this.state
		const {
			id,
			regularContribution,
			additionalContribution,
			portabilityContribution,
			supplementaryPlanContribution,
			insuranceCompanyContribution,
			totalBalance,
		} = wallet || emptyWallet
		return (
			<Container textAlign='center' fluid>
				<Header content='Find wallet' style={ headerStyle }/>
				<Form>
					<Form.Field style={ formStyle }>
						<Label content='CPF:' style={ formLabelStyle } />
						<MaskedInput
							// placeholder='CPF'
							name='cpf'
							id='1'
							type='text'
							value={ cpf || '' }
							onChange={ this.handleCPFChange }
							mask={ cpfMask }
						/>
					</Form.Field>
					<Button
						content={ resultVisible ? 'HIDE WALLET' : 'FIND WALLET' }
						style={ buttonStyle }
						loading={ loading }
						onClick={ this.handleFindWalletClick }
						primary
					/>
				</Form>
				<Transition.Group animation='fly down' duration={ 1500 }>
					{ resultVisible &&
					<Container textAlign='left' style={ bottomContainerStyle }>
						<Header style={ infoStyle }>Wallet ID:   <span style={ valueStyle }>{ id }</span> </Header>
						<Header style={ infoStyle }>Regular Contribution:   <span style={ valueStyle }>{ handleBrazilianMoney(regularContribution) }</span> </Header>
						<Header style={ infoStyle }>Additional Contribution:   <span style={ valueStyle }>{ handleBrazilianMoney(additionalContribution) }</span> </Header>
						<Header style={ infoStyle }>Portability Contribution:   <span style={ valueStyle }>{ handleBrazilianMoney(portabilityContribution) }</span> </Header>
						<Header style={ infoStyle }>Supplementary Plan Contribution:   <span style={ valueStyle }>{ handleBrazilianMoney(supplementaryPlanContribution)}</span> </Header>
						<Header style={ infoStyle }>Insurance Company Contribution:   <span style={ valueStyle }>{ handleBrazilianMoney(insuranceCompanyContribution) }</span> </Header>
						<Header style={ infoStyle }>Total balance:   <span style={ valueStyle }>{ handleBrazilianMoney(totalBalance) }</span> </Header>
					</Container> }
				</Transition.Group>
			</Container>
		)
	}
}

const mapStateToProps = (state: RootReducerInterface) => ({ })
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ }, dispatch)
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(FindUserPanel)

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {
	loading: boolean,
	resultVisible: boolean,
	wallet: WalletInterface,
	cpf: string,
}

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState

/////////////////////////////////////////////////////////////////
///////////////////////////// STYLES ////////////////////////////
/////////////////////////////////////////////////////////////////
const headerStyle = {
	fontWeight: 600,
	fontSize: '2em',
	marginBottom: '2em',
}
const formLabelStyle = {
	paddingBottom: '0em',
	paddingLeft: '0em',
	fontWeight: 600,
	backgroundColor: 'transparent',
	color: 'black',
	fontSize: '1em',
}
const formStyle = {
	textAlign: 'left',
}
const buttonStyle = {
	marginTop: '2em',
}
const bottomContainerStyle = {
	marginTop: '3em',
}
const infoStyle = {
	...formLabelStyle,
	fontWeight: 400,
}
const valueStyle = {
	...formLabelStyle,
	color: '#2453a2',
	fontWeight: 800,
}

