import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Segment } from 'semantic-ui-react'
import FindUserPanel from '../components/findUserPanel'
import FindWalletPanel from '../components/findWalletPanel'
import { RootReducerInterface } from '../interfaces/reduxInterfaces'



class HomePage extends React.Component<Props, State> {
	render() {
		return (
			<Grid container columns={ 2 } style={ homePageStyle }>
				<Grid.Column>
					<Segment style={ segmentStyle }>
						<FindUserPanel />
					</Segment>
				</Grid.Column>
				<Grid.Column>
					<Segment style={ segmentStyle }>
						<FindWalletPanel />
					</Segment>
				</Grid.Column>
			</Grid>
		)
	}
}

const mapStateToProps = (state: RootReducerInterface) => ({ })
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ }, dispatch)
export default connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(HomePage)

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
///////////////////////////// STYLES ////////////////////////////
/////////////////////////////////////////////////////////////////
const homePageStyle =  {
	padding: '3em 0em',
}
const segmentStyle = {
	padding: '2em',
}
