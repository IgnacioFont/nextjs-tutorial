import '../styles/global.css'
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../utils/apollo";

function App({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

  // Wraps all components in the tree with the data provider
export default withData(App);