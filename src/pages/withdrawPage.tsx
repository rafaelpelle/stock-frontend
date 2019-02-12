import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Segment } from 'semantic-ui-react'
import { RootReducerInterface } from '../interfaces/reduxInterfaces'
import WithdrawPanel from '../components/withdrawPanel'



class WithdrawPage extends React.Component<Props, State> {
	render() {
		return (
			<Grid container centered style={ pageStyle }>
				<Grid.Column computer={ 8 } mobile={ 16 }>
					<Segment style={ segmentStyle }>
						<WithdrawPanel />
					</Segment>
				</Grid.Column>
			</Grid>
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


/////////////////////////////////////////////////////////////////
///////////////////////////// STYLE ////////////////////////////
/////////////////////////////////////////////////////////////////

const pageStyle =  {
	padding: '3em 0em',
}
const segmentStyle = {
	padding: '2em',
}
