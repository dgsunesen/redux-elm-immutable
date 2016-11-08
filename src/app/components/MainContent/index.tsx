declare function require(name: string): any;

import * as React from "react";

const MainContent: React.StatelessComponent<{children?: any}> = ({children}) =>
  <main>
    {children}
  </main>;

export default MainContent;
