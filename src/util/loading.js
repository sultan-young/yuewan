import Vue from 'vue';
import {
  Toast
} from 'vant';

Vue.use(Toast);

function toast() {
  Toast.loading({
    message: "加载中...",
    forbidClick: true,
    duration: 0,
  });
}

function stopToast(){
    Toast.clear();
}

export {
    toast,
    stopToast
}
