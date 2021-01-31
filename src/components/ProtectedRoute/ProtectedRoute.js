import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CurrentUserContext from '../../context/CurrentUserContext';

const ProtectedRout = ({ component: Component, ...props }) => {
  const { path } = props;
  const currentUser = useContext(CurrentUserContext);

  return (
    <Route exact path={path}>
      {
        // eslint-disable-next-line
        () => (currentUser.name ? <Component {...props} /> : <Redirect to="/" />)
      }
    </Route>
  );
};

export default ProtectedRout;
