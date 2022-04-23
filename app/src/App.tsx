import React from "react";
import Editor from "./pages/Editor";
import { Layout } from "./components/ui";

const { Content, Header } = Layout;

const App = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <Header title="Photo Editor App" />
      <Content style={{ margin: "36px" }}>
        <Editor />
      </Content>
    </Layout>
  );
};

export default App;
