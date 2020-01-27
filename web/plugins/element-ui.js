import Vue from 'vue'
import {
  Alert,
  Avatar,
  Backtop,
  Badge,
  Button,
  Calendar,
  Carousel,
  Card,
  CarouselItem,
  Collapse,
  CollapseItem,
  Divider,
  Form,
  FormItem,
  Icon,
  Image,
  Input,
  Link,
  Message,
  Menu,
  MenuItem,
  Tag,
  Tooltip,
} from 'element-ui'

export default () => {
  Vue.use(Alert)
  Vue.use(Avatar)
  Vue.use(Backtop)
  Vue.use(Badge)
  Vue.use(Button)
  Vue.use(Carousel)
  Vue.use(CarouselItem)
  Vue.use(Calendar)
  Vue.use(Card)
  Vue.use(CollapseItem)
  Vue.use(Collapse)
  Vue.use(Divider)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(Icon)
  Vue.use(Link)
  Vue.use(Image)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(Tag)
  Vue.use(Tooltip)
  Vue.prototype.$message = Message
}
