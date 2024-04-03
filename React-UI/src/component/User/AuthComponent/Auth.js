import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { userUrl } from '../../../app.url';
import axios from 'axios';


function Auth() {
  const navigate = useNavigate();

  const [ role, setRole ] = useState('');
  const user_token = localStorage.getItem("user_token");

  const checkUser = () => {
    if (user_token != null) {
      axios.get(userUrl + "fetch?user_token=" + user_token)
        .then((response) => {
          setRole(response.data[ 0 ].role);
        });
    } else {
      navigate("/login");
    }
  }

  const authenticateUser = () => {
    const role = localStorage.getItem('role');
    var path = window.location.pathname;

    if (!role && path === "/profile") {
      navigate("/login");
    } else if (role !== "admin" && (path === "/admin" || path === "/admin/home" || path === "/admin/Home" || path === "/admin/userDetails" || path === "/admin/addProduct" || path === "/admin/addCategory" || path === "/admin/deleteCategory" || path === "/admin/updateCategory" || path === "/admin/addSubCategory" || path === "/admin/deleteSubCategory" || path === "/admin/updateSubCategory")) {
      navigate("/login");
    }
  };

  useEffect(() => {
    // checkUser();
    authenticateUser();
  }, []);

  return (
    <></>
  )
}

export default Auth;
