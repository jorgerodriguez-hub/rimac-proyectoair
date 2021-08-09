// Layout
import LayoutAdmin from '../layouts/LayoutAdmin';

// Admin Pages
import AdminRegistro from '../pages/Admin/RegistroPage';
import AdminBandeja from '../pages/Admin/BandejaPage';

// Login
import LoginAD from '../pages/LoginAD';

// Other
import Error404 from '../pages/Error404';

const routes = [
    {
        path: "/",
        component: LayoutAdmin,
        exact: false,
        routes: [
            // {
            //     path: "/",
            //     component: LoginAD,
            //     exact: true
            // },
            {
                path: "/admin/registro",
                component: AdminRegistro,
                exact: true
            },
            {
                path: "/admin/bandeja",
                component: AdminBandeja,
                exact: true
            },
            {   
                component: Error404
            }
        ]
    },
    // {
    //     path: "/",
    //     component: LoginAD,
    //     exact: false
    // }
];

export default routes;