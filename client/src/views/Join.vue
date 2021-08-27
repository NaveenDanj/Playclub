<template>

  <v-container>

    <center>

      <v-card  max-width="900">

        <v-toolbar
          color="primary"
          dark
          flat
        >
          <v-icon>mdi-server </v-icon>
          <v-toolbar-title class="ml-2">Join Server</v-toolbar-title>
        </v-toolbar>

        <v-form
            ref="form"
            class="pa-4 pt-6"
          >

            <v-text-field
              filled
              color="deep-purple"
              label="Display Name"
              v-model="display_name"
              :rules="[() => !!display_name || 'This field is required']"
              style="min-height: 96px"
              type="text"
            ></v-text-field>

            <v-text-field
              v-model="room_id"
              :rules="[() => !!room_id || 'This field is required']"
              filled
              color="deep-purple"
              label="Room ID"
              style="min-height: 96px"
              type="text"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="[() => !!password || 'This field is required']"
              filled
              color="deep-purple"
              label="Password"
              type="password"
            ></v-text-field>

            <v-checkbox
              color="deep-purple"
              v-model="disabled"
            >
              <template v-slot:label>
                I agree to the&nbsp;
                <a
                  href="#"
                  @click.stop.prevent="disabled = true"
                >Terms of Service</a>
                &nbsp;and&nbsp;
                <a
                  href="#"
                  @click.stop.prevent="disabled = true"
                >Privacy Policy</a>*
              </template>
            </v-checkbox>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>

          <v-btn text>Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!disabled" @click="handleLoginRoom" class="white--text" color="deep-purple accent-4" depressed>Submit</v-btn>
        </v-card-actions>

      </v-card>

    </center>
  </v-container>
</template>

<script>

import { get_socket_node } from '../socketConfig';


export default {
  name: 'Join',

  data(){
    return {
      disabled : true,
      display_name : '',
      room_id : '',
      password : '',
      max_users : 4
    }
  },

  methods : {
    
    handleLoginRoom(){
        if(this.display_name != '' && this.room_id != '' && this.password != '' && this.max_users != null){
            get_socket_node().emit("join_room",  {username : this.display_name ,  room_id : this.room_id , password : this.password });
        }else{
            console.log('form has error!');
        }
    }
  
  },

  created(){

    get_socket_node().on('login_room_success' , (arg) => {
        console.log('login success ' , arg);
    });

    get_socket_node().on('login_room_error' , (arg) => {
        console.log('login error ' , arg);
    });


  },
  
}
</script>
