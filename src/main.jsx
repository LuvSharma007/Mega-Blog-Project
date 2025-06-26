import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { AuthLayout, Login} from './components/index.js'
import { RouterProvider , createBrowserRouter} from 'react-router-dom'
import AddPost from "./pages/AddPost";
import AllPosts from "./pages/AllPosts";
import Home from "./pages/Home"
import EditPost from "./pages/EditPost"
import Post from "./pages/Post"
import Signup from "./pages/Signup";


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
        path:'/',
        element:<Home/>,
      },
      {
        path:'/login',
        element:(
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        )
      },
      {
        path:'/signup',
        element:(
          <AuthLayout authentication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path:"/all-posts",
        element:(
          <AuthLayout authentication>
            {" "}
            <AllPosts />
          </AuthLayout>
        )
      },
      {
        path:"/add-post",
        element:(
          <AuthLayout authentication>
            {" "}
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path:"/edit-post/:id",
        element:(
          <AuthLayout authentication>
            {" "}
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:'/post/:id',
        element:<Post/>
      }
  ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
