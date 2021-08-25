<template>
  <v-app>

    <v-navigation-drawer 
      app
      v-model="drawer"
    >
      <v-list-item>
        <v-list-item-content>

          <v-list-item-title class="text-h6">
            PLAYCLUB
          </v-list-item-title>

          <v-list-item-subtitle>
            
          </v-list-item-subtitle>

        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app class="ml-0 mr-0">

      <v-toolbar
        color="blue"
        dark
        class="ml-0 mr-0"
      >
          <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>PLAYCLUB</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>

      </v-toolbar>


    </v-app-bar>

    <v-main>

      <v-container fluid>
        <router-view></router-view>
      </v-container>

    </v-main>

    <v-footer app>

    </v-footer>

  </v-app>
</template>

<script>
import { get_socket_node } from './socketConfig';


export default {

  data () {
    return {
      drawer : true,
      items: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard' },
        { title: 'Photos', icon: 'mdi-image' },
        { title: 'About', icon: 'mdi-help-box' },
      ],
      right: null,
    }
  },

  name: 'App',

  created(){
    console.log(get_socket_node());
  },

}
</script>

