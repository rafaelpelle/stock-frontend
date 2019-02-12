import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { axiosInstance } from '../utils/httpClient'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { Button, Container, Form, Header, Label, Transition } from 'semantic-ui-react'
import { RootReducerInterface } from '../interfaces/reduxInterfaces'
import { ChangeEvent } from 'react'
import TransactionDropdown from '../components/transactionDropdown'
import MaskedInput from 'react-text-mask'

const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ]
const brazilianMoneyMask = createNumberMask({
	allowDecimal: true,
	allowLeadingZeroes: false,
	allowNegative: false,
	decimalLimit: 2,
	decimalSymbol: ',',
	includeThousandsSeparator: true,
	integerLimit: null,
	prefix: 'R$ ',
	requireDecimal: true,
	suffix: '00',
	thousandsSeparatorSymbol: '.',
})



class DepositPanel extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { loading: false, resultVisible: false, result: '', cpf: '', transactionValue: '', type: '', icon: null }
	}

	handleCPFChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ cpf: String(event.target.value).replace(/[^0-9]/g, '') })
	}

	handleValueChange = (event: any) => {
		this.setState({ ...this.state, [event.target.name]: String(event.target.value).replace(/[^0-9]/g, '') })
	}

	handleTypeChange = (type: string) => {
		this.setState({ type })
	}

	handleRegisterClick = async () => {
		this.setState({ loading: true })
		const { cpf, transactionValue, type } = this.state
		let result = ''
		let icon = ''
		try {
			const request = await axiosInstance.post('/deposit', {
				id: null,
				userCpf: cpf,
				installmentValue: (Number(transactionValue) / 100),
				numberOfInstallments: 1,
				type,
				date: null,
			})
			result = request.data.successMsg
			icon = 'check'
		} catch (e) {
			console.log(e)
			result = e.response.data.errorMsg
			icon = 'x'
		}
		this.setState({ loading: false, resultVisible: true, result, icon })
	}

	render() {
		const { loading, resultVisible, cpf, transactionValue, result, icon } = this.state
		return (
			<Container textAlign='center' fluid>
				<Header content='Deposit transaction' style={ headerStyle }/>
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
					<Form.Field style={ formStyle }>
						<Label content='Value:' style={ formLabelStyle }  />
						<MaskedInput
							name='transactionValue'
							id='transactionValue'
							type='text'
							value={ transactionValue || '' }
							onChange={ this.handleValueChange }
							mask={ brazilianMoneyMask }
						/>
					</Form.Field>
					<Form.Field style={ formStyle }>
						<Label content='Type:' style={ formLabelStyle } />
						<TransactionDropdown handleTypeChange={ this.handleTypeChange } />
					</Form.Field>
					<Button
						content={ resultVisible ? null : 'DEPOSIT' }
						icon={ resultVisible ? icon : null }
						style={ buttonStyle }
						loading={ loading }
						fluid={ resultVisible }
						onClick={ this.handleRegisterClick }
						primary
					/>
				</Form>
				<Transition.Group animation='fly down' duration={ 1000 }>
					{ resultVisible &&
						<Header content={ result } style={ valueStyle }/>
					}
				</Transition.Group>
			</Container>
		)
	}
}

const mapStateToProps = (state: RootReducerInterface) => ({ })
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ }, dispatch)
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(DepositPanel)

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {
	loading: boolean,
	resultVisible: boolean,
	result: string,
	cpf: string,
	transactionValue: string,
	type: string,
	icon: string,
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
	transition: 'all .2s ease-in-out',
}
const valueStyle = {
	...formLabelStyle,
	color: '#2453a2',
	fontWeight: 800,
}
