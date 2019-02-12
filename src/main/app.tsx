import * as React from 'react'
import { Menu } from 'semantic-ui-react'
require('./app.css')

class App extends React.Component<any, any> {
	render() {
		return (
			<div>
				<Menu fixed='top' style={ menuStyle }>
				</Menu>
			</div>
		)
	}
}
export default App


const menuStyle = {
	backgroundColor: '#b11016',
}
