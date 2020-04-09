import MyUnion from '../views/MyUnion';
import Home from '../views/Home';
import Union from '../views/Union';
import Login from '../views/Login';
import Application from '../views/Application'
import UserList from '../views/UserList'
import UnionList from '../views/UnionList'
import NotFound from '../views/NotFound';

const routerConfig = {
  'user': [
    { path: '/', component: Home, role: ['user'] },
    { path: '/union', component: Union, role: ['user'] },
    { path: '/myunion', component: MyUnion, role: ['user'] },
  ],
  'admin': [
    { path: '/application', component: Application, role: ['admin'] },
    { path: '/userlist', component: UserList, role: ['admin'] },
    { path: '/unionlist', component: UnionList, role: ['admin'] },
  ]
}

export default routerConfig