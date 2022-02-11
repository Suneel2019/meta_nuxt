import Vue from 'vue';
import Error404 from "@/components/error/Error404";
import Error503 from "@/components/error/Error503";

const components = {Error404, Error503};

Object.entries(components).forEach(([name, component]) => {

  Vue.component(name, component)

})

