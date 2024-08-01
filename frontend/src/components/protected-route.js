// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Cookies from 'js-cookie';
import toastr from 'toastr';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = Cookies.get('token');
    console.log('Token Protected-Route', token);
  if (!token) {
    // Token yoksa login sayfasına yönlendir
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);
    console.log('Decoded Protected-Route', decoded);

    if (allowedRoles.includes(decoded.role)) {
      // Kullanıcı role uygun ise çocuk bileşenleri render et
      return <Outlet />;
    } else {
     toastr.error('Access Denied!', 'Error');
      // Kullanıcı role uygun değilse erişim reddi mesajı göster
      return <Navigate to="/login" />;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
