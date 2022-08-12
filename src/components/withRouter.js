import { useLocation } from "react-router-dom";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    const location = useLocation();
    return <Component {...props} router={{ location }} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter;
