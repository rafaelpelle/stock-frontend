import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { axiosInstance } from '../utils/httpClient'
import { Button, Container, Form, Header, Image, Label, Transition } from 'semantic-ui-react'
import { RootReducerInterface } from '../interfaces/reduxInterfaces'
import { UserInterface } from '../interfaces/modelInterfaces'
import { ChangeEvent } from 'react'
import MaskedInput from 'react-text-mask'

const cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ]
const emptyUser = {
	id: '',
	walletId: '',
	registrationDate: '',
	lastRegularWithdraw: '',
	status: '',
	name: '',
}


class UserRegisterPanel extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { loading: false, resultVisible: false, result: '', cpf: '', name: '', icon: null }
	}

	handleCPFChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ cpf: String(event.target.value).replace(/[^0-9]/g, '') })
	}

	handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ name: String(event.target.value) })
	}

	handleRegisterClick = async () => {
		this.setState({ loading: true })
		const { cpf, name } = this.state
		let result = ''
		let icon = ''
		try {
			const request = await axiosInstance.put(`/user/`, {
				id: null,
				walletId: null,
				registrationDate: null,
				lastRegularWithdraw: null,
				status: null,
				name,
				cpf,
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
		const { loading, resultVisible, cpf, name, result, icon } = this.state
		return (
			<Container textAlign='center' fluid>
				<Header content='Register user' style={ headerStyle }/>
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
						<Label content='Name:' style={ formLabelStyle } />
						<Form.Input
							// placeholder='CPF'
							name='name'
							type='text'
							value={ name || '' }
							onChange={ this.handleNameChange }
							autoComplete='off'
						/>
					</Form.Field>
					<Button
						content={ resultVisible ? null : 'REGISTER' }
						icon={ resultVisible ? icon : null }
						style={ buttonStyle }
						loading={ loading }
						fluid={ resultVisible }
						onClick={ this.handleRegisterClick }
						primary
					/>
				</Form>
				<Transition.Group animation='fly down' duration={ 1500 }>
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
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(UserRegisterPanel)

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {
	loading: boolean,
	resultVisible: boolean,
	result: string,
	name: string,
	cpf: string,
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

