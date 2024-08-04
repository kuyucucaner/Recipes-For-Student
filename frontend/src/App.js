// recipe-app/frontend/src/App.js
import React, { Suspense, lazy , useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './styles/styles.css';
import Navbar from './components/navbar';
import Register from './components/register';
import Login from './components/login';
import Home from './components/home';
import ProtectedRoute from './components/protected-route';
import { requestNotificationPermission} from './utils/notification-utils';


const Profile = lazy(() => import('./components/profile'));
const RecipeDetail = lazy(() => import('./components/recipe-detail'));
const RecipeList = lazy(() => import('./components/recipe-list'));
const AddRecipe = lazy(() => import('./components/add-recipe'));
const UpdateRecipePage = lazy(() => import('./components/update-recipe-page'));

const App = () => {
  useEffect(() => {
    requestNotificationPermission();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute allowedRoles={[2, 1,0]} />}>
          <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<Home />}/>
          <Route path="/recipe-list" element={<RecipeList />} />
          <Route path="/recipes/detail/:id" element={<RecipeDetail />} />
          <Route element={<ProtectedRoute allowedRoles={[2, 0]} />}>
            <Route path="/add-recipe" element={<AddRecipe />} />
          </Route>
          <Route path="/update-recipe/:id" element={<UpdateRecipePage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
