/** 
 *  @author 小周
 * @description  按需引入Vant
*/ 
import { Button, Tabbar, TabbarItem   } from 'vant'
const  pluginsVant = [
  Button, 
  Tabbar,
  TabbarItem
]
export const vantPlugins = {
  install: function(vm) {
    pluginsVant.forEach(item => {
      vm.component(item.name, item);
    });
  }
};