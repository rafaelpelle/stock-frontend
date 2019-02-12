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


class FindUserPanel extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { loading: false, resultVisible: false, user: null, cpf: '' }
	}

	handleCPFChange = (event: ChangeEvent<HTMLInputElement>) => {
		this.setState({ cpf: String(event.target.value).replace(/[^0-9]/g, '') })
	}

	handleFindUserClick = async () => {
		this.setState({ loading: true })
		const { cpf } = this.state
		try {
			const request = await axiosInstance.get(`/user/${cpf}`)
			console.log(request.data)
			this.setState({ user: request.data, loading: false, resultVisible: true })
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		const { loading, resultVisible, cpf, user } = this.state
		const { id, walletId, registrationDate, lastRegularWithdraw, status, name } = user ||
		{ id: '', walletId: '', registrationDate: '', lastRegularWithdraw: '', status: '', name: '' }
		return (
			<Container textAlign='center' fluid>
				<Header content='Find user' style={ headerStyle }/>
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
						content='FIND USER'
						style={ buttonStyle }
						loading={ loading }
						onClick={ this.handleFindUserClick }
						primary
					/>
				</Form>
				<Transition.Group animation='fly right' duration={ 1000 }>
					{ resultVisible &&
					<Container textAlign='left' style={ bottomContainerStyle }>
						<Header style={ infoStyle }>User ID:   <span style={ valueStyle }>{ id }</span> </Header>
						<Header style={ infoStyle }>Name:   <span style={ valueStyle }>{ name }</span> </Header>
						<Header style={ infoStyle }>CPF:   <span style={ valueStyle }>{ cpf }</span> </Header>
						<Header style={ infoStyle }>Wallet ID:   <span style={ valueStyle }>{ walletId }</span> </Header>
						<Header style={ infoStyle }>Status:   <span style={ valueStyle }>{ status }</span> </Header>
						<Header style={ infoStyle }>Registration date:   <span style={ valueStyle }>{ registrationDate }</span> </Header>
						<Header style={ infoStyle }>Last regular withdraw:   <span style={ valueStyle }>{ lastRegularWithdraw }</span> </Header>
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
	user: UserInterface,
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

