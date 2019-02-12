import * as React from 'react'
import { Dropdown } from 'semantic-ui-react'

const dropdownStyle = { textOverflow: 'ellipsis' }


class TransactionDropdown extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = { selectedOption: null }
	}

	handleChange = (proxy: any, event: any) => {
		this.setState({ selectedOption: event.value }, () => {
			this.props.handleTypeChange(event.value)
		})
	}

	render() {
		const { selectedOption } = this.state
		const { hideTotal } = this.props
		return (
			<Dropdown
				onChange={ this.handleChange }
				options={ hideTotal ? hideTotalOptions : totalOptions }
				value={ selectedOption }
				style={ dropdownStyle }
				fluid
				selection
			/>
		)
	}
}
export default TransactionDropdown

/////////////////////////////////////////////////////////////////
/////////////////////////// INTERFACES //////////////////////////
/////////////////////////////////////////////////////////////////
interface OwnState {
	selectedOption: string | null,
}

interface OwnProps {
	handleTypeChange: (type: string) => void,
	hideTotal?: boolean,
}

interface StateProps {}

interface DispatchProps {}

type Props = StateProps & DispatchProps & OwnProps
type State = OwnState


const totalOptions = [
	{ text: 'Regular contribution', value: 'regularContribution', key: 'regularContribution' },
	{ text: 'Additional contribution', value: 'additionalContribution', key: 'additionalContribution' },
	{ text: 'Portability contribution', value: 'portabilityContribution', key: 'portabilityContribution' },
	{ text: 'Supplementary plan contribution', value: 'supplementaryPlanContribution', key: 'supplementaryPlanContribution' },
	{ text: 'Insurance company contribution', value: 'insuranceCompanyContribution', key: 'insuranceCompanyContribution' },
	{ text: 'Total wthdraw', value: 'totalWithdraw', key: 'totalWithdraw' },
]

const hideTotalOptions = [
	{ text: 'Regular contribution', value: 'regularContribution', key: 'regularContribution' },
	{ text: 'Additional contribution', value: 'additionalContribution', key: 'additionalContribution' },
	{ text: 'Portability contribution', value: 'portabilityContribution', key: 'portabilityContribution' },
	{ text: 'Supplementary plan contribution', value: 'supplementaryPlanContribution', key: 'supplementaryPlanContribution' },
	{ text: 'Insurance company contribution', value: 'insuranceCompanyContribution', key: 'insuranceCompanyContribution' },
]
