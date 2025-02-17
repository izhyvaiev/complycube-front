import { Redirect, Route, Switch } from 'react-router'
import { useRoutes } from './hooks/useRoutes'
import {Page, Header, Body} from './components/base'

function App() {
    const { routes, defaultRoute } = useRoutes()
    return (
        <Page>
            <Header>
                <h1>Identity Validation</h1>
            </Header>
            <Body>
                <Switch>
                    {routes.map((props, index) => (
                        <Route {...props} key={index} />
                    ))}
                    <Redirect to={defaultRoute} />
                </Switch>
            </Body>
        </Page>
    )
}

export default App
