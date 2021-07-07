// Layout
import LayoutAdmin from '../layouts/LayoutAdmin';

// Admin Pages
import AdminRegistro from '../pages/Admin/RegistroPage';
import AdminBandeja from '../pages/Admin/BandejaPage';

// Other
import Error404 from '../pages/Error404';

const routes = [
    {
        path: "/",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/",
                component: AdminRegistro,
                exact: true
            },
            {
                path: "/registro",
                component: AdminRegistro,
                exact: true
            },
            {
                path: "/bandeja",
                component: AdminBandeja,
                exact: true
            },
            {   
                component: Error404
            }
        ]
    }
];

export default routes;