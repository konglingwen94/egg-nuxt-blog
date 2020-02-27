import Vue from 'vue'

import {
  Aside,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Checkbox,
  CheckboxGroup,
  Col,
  Container,
  Dialog,
  Form,
  FormItem,
  Header,
  Icon,
  Image,
  Input,
  InputNumber,
  Main,
  Menu,
  MenuItem,
  Message,
  MessageBox,
  Option,
  PageHeader,
  Popover,
  Radio,
  RadioGroup,
  Row,
  Select,
  Slider,
  Submenu,
  Switch,
  TabPane,
  Table,
  TableColumn,
  Tabs,
  Tag,
  Timeline,
  TimelineItem,
  Upload,
  Tooltip,
} from 'element-ui'

export default () => {
  Vue.use(Aside)
  Vue.use(Button)
  Vue.use(Breadcrumb)
  Vue.use(BreadcrumbItem)
  Vue.use(Card)
  Vue.use(Checkbox)
  Vue.use(CheckboxGroup)
  Vue.use(Col)
  Vue.use(Container)
  Vue.use(Dialog)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Header)
  Vue.use(Icon)
  Vue.use(Image)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Main)
  Vue.use(Menu)
  Vue.use(MenuItem)
  Vue.use(Option)
  Vue.use(PageHeader)
  Vue.use(Popover)
  Vue.use(Radio)
  Vue.use(RadioGroup)
  Vue.use(Row)
  Vue.use(Select)
  Vue.use(Slider)
  Vue.use(Submenu)
  Vue.use(Switch)
  Vue.use(TabPane)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Tabs)
  Vue.use(Tag)
  Vue.use(Timeline)
  Vue.use(TimelineItem)
  Vue.use(Upload)

  Vue.use(Tooltip)

  Vue.prototype.$message = Message
  Vue.prototype.$confirm = MessageBox.confirm
  Vue.prototype.$prompt = MessageBox.prompt
}
