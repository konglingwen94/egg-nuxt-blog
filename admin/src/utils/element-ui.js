import Vue from 'vue'

import {
  Table,
  TableColumn,
  Popover,
  Tabs,
  TabPane,
  Dialog,
  Message,
  Button,
  Form,
  FormItem,
  Input,
  InputNumber,
  Icon,
  Tag,
  Menu,
  Submenu,
  MenuItem,
  Image,
  Switch,
  Select,
  Option,
  Upload,
  Card,
  Container,
  Header,
  Aside,
  Main,
  Timeline,
  TimelineItem,
  PageHeader,
  MessageBox,
  Col,
  Row,
  Checkbox,
  CheckboxGroup,
  RadioGroup,
  Radio,
  Slider
} from 'element-ui'

export default () => {
  Vue.use(CheckboxGroup)
  Vue.use(Checkbox)
  Vue.use(Container)
  Vue.use(Header)
  Vue.use(Aside)
  Vue.use(Main)
  Vue.use(Timeline)
  Vue.use(TimelineItem)
  Vue.use(PageHeader)
  Vue.use(Row)
  Vue.use(Col)

  Vue.use(Card)
  Vue.use(Upload)
  Vue.use(Tabs)
  Vue.use(TabPane)
  Vue.use(Button)
  Vue.use(Dialog)
  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Input)
  Vue.use(InputNumber)
  Vue.use(Icon)

  Vue.use(Tag)
  Vue.use(Image)
  Vue.use(Table)
  Vue.use(TableColumn)
  Vue.use(Popover)

  Vue.use(Menu)
  Vue.use(Submenu)
  Vue.use(MenuItem)
  Vue.use(Switch)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(RadioGroup)
  Vue.use(Radio)
  Vue.use(Slider)

  Vue.prototype.$message = Message
  Vue.prototype.$confirm = MessageBox.confirm
}
