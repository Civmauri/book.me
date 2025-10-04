import { UserProvider } from './components/User_Context'
import SiteRouting from './siteRouting/SiteRouting.jsx'

export default function App() {
    return (
        <UserProvider>
            <SiteRouting />
        </UserProvider>
    )
}
  