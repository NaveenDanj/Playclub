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
          :to="item.link"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>

      <v-treeview :items="rooms">

        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.file">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            {{ files[item.file] }}
          </v-icon>

        </template>

      </v-treeview>



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
        <router-view>
        </router-view>
      </v-container>

    </v-main>

    <v-footer app>
      <v-card
        flat
        tile
        width="100%"
        class="blue lighten-1 text-center"
      >
        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>PLAYCLUB</strong>
        </v-card-text>
      </v-card>
    </v-footer>

  </v-app>
</template>

<script>
import { get_socket_node } from './socketConfig';


export default {

  data () {
    return {
      drawer : true ,
      items: [
        { title: 'Home', icon: 'mdi-view-dashboard' , link : '/' },
        { title: 'Join', icon: 'mdi-location-enter ' , link : '/join' },
        { title: 'About', icon: 'mdi-help-box' , link : '/about' },
      ],
      right: null,

      rooms: [
        {
          id: 1,
          name: 'Public Rooms',
          children: [
            { id: 2, name: '(Comming Soon)' },
          ],
        },
      ]


    }
  },

  name: 'App',

  created(){
    console.log(get_socket_node());
  },

}
</script>

