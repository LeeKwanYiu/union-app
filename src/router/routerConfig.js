import MyUnion from '../views/MyUnion';
import Home from '../views/Home';
import Union from '../views/Union';
import Login from '../views/Login';
import NotFound from '../views/NotFound';

const routerConfig = [
  { path: '/', component: Home },
  { path: '/union', component: Union },
  { path: '/myunion', component: MyUnion },
  { path: '/login', component: Login },
  { path: '/404', component: NotFound },
]

export default routerConfig