import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { authUser } from '../_actions/user_action';

//eslint-disable-next-line
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(authUser()).then((response) => {
        console.log(response);
        if (!response.payload.isAuth) {
          if (option === true) {
            props.history.push('/login');
          }
        } else {
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/');
          } else {
            if (option === false) props.history.push('/');
          }
        }
      });
      //eslint-disable-next-line
    }, []);

    return <SpecificComponent {...props} user={user} />;
  }
  return AuthenticationCheck;
}
