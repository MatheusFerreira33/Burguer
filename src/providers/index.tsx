import UserProvider from './UserContext'

interface iChildren {
  children: React.ReactNode;
}

const Providers = ({ children }: iChildren) => <UserProvider>{children}</UserProvider>

export default Providers;