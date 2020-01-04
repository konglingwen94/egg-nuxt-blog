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
  Menu,
  MenuItem,
  Carousel,
  CarouselItem,
  Image,
  Calendar,
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
  Vue.use(Image)
  Vue.use(Badge)
  Vue.use(Avatar)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(Calendar)
  Vue.prototype.$message = Message
}
