<template>
  <div id="app">
    <h2>Homepage</h2>
  </div>
</template>

<script>
import { get_socket_node } from './socketConfig';


export default {

  name: 'App',

  created(){
    console.log(get_socket_node());
  },

}
</script>

