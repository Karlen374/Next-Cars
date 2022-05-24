import React from 'react';
import { AppProps } from 'next/app';
import '../styles/index.scss';

class MyApp extends React.Component<AppProps> {
  render() {
    const { Component, pageProps } = this.props;
    return (<Component {...pageProps} />);
  }
}

export default MyApp;
// import { Scope, fork, serialize } from 'effector';
// import { Provider } from 'effector-react/scope';

// import '../styles/index.scss';

// let clientScope: Scope;

// export default function App({Component, pageProps }: any) {
//   const scope = fork({
//     values: {
//       ...(clientScope && serialize(clientScope)),
//       ...pageProps.initialState,
//     },
//   })
//   if (typeof window !== 'undefined') clientScope = scope
//   console.log('scope', serialize(scope))
//   return (
//     <Provider value={scope}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }
