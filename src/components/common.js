import Vue from "vue";
import FontAwesome from "fontawesome";

import { Loading, Message, MessageBox, Form, FormItem, Input, Button, Carousel, CarouselItem, Tooltip, Radio, RadioGroup, DatePicker, Pagination } from "element-ui";

Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Carousel.name, Carousel);
Vue.component(CarouselItem.name, CarouselItem);
Vue.component(Tooltip.name, Tooltip);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Pagination.name, Pagination);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$fontawesome = FontAwesome;
