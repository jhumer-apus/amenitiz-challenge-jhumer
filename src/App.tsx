import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Grandmasters from './pages';
import Profile from './pages/profile';

function App() {  

  const router = createBrowserRouter([
    {
      path: "/",
      Component: Grandmasters,
    },
    {
      path: "/:username",
      Component: Profile,
    },
  ]);

  return (
    <div className='w-screen min-h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
