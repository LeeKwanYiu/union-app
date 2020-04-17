import MyUnion from '../views/MyUnion';
import Home from '../views/Home';
import Union from '../views/Union';
import Application from '../views/Application'
import UserList from '../views/UnionUserList'
import UnionList from '../views/UnionList'
import Introduction from '../views/Introduction'
import UnionApplication from '../views/UnionApplication'
import UnionUserList from '../views/UnionUserList'
import ProjectList from '../views/ProjectList'
import TaskList from '../views/TaskList'

const routerConfig = {
  'user': params => [
    { path: '/', component: Home, role: ['user'] },
    { path: '/union', component: Union, role: ['user'] },
    { path: '/myunion', component: MyUnion, role: ['user'] },
    { path: `/myunion/${params.unionId}/introduction`, component: Introduction },
    { path: `/myunion/${params.unionId}/users`, component: UnionUserList },
    { path: `/myunion/${params.unionId}/projects`, component: ProjectList },
    { path: `/myunion/${params.unionId}/applications`, component: UnionApplication },
    { path: `/myunion/${params.unionId}/projects/${params.projectId}`, component: TaskList }
  ],
  'admin': [
    { path: '/application', component: Application, role: ['admin'] },
    { path: '/userlist', component: UserList, role: ['admin'] },
    { path: '/unionlist', component: UnionList, role: ['admin'] },
  ]
}

export default routerConfig