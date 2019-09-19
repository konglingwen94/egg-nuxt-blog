import {
  Message,
  Button,
  Form,
  FormItem,
  Input,
  Backtop,
  Icon,
  Divider,
  Link,
  Alert,
  Tag,
  Badge,
  Avatar,
} from 'element-ui'
import Vue from 'vue'

export default () => {
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Backtop)
  Vue.use(Icon)
  Vue.use(Divider)
  Vue.use(Link)
  Vue.use(Alert)
  Vue.use(Tag)
  Vue.use(Badge)
  Vue.use(Avatar)

  Vue.prototype.$message = Message
}
