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
          <v-toolbar-title class="ml-2">Create Server</v-toolbar-title>
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
              required
            ></v-text-field>


            <v-text-field
              v-model="room_id"
              :rules="[() => !!room_id || 'This field is required']"
              filled
              color="deep-purple"
              label="Room ID"
              style="min-height: 96px"
              type="text"
              readonly
              required
            ></v-text-field>

            <v-text-field
              v-model="password"
              :rules="[() => !!password || 'This field is required']"
              filled
              color="deep-purple"
              label="Password"
              type="password"
              required
            ></v-text-field>

            <v-select
              v-model="max_users"
              :rules="[() => !!max_users || 'This field is required']"
              :items="[4 , 8 , 16]"
              filled
              label="Maximum Listeners"
              required
            ></v-select>
           
            <v-checkbox
              color="deep-purple"
              v-model="disabled"
            >
              <template v-slot:label>
                I agree to the&nbsp;
                <a
                  href="#"
                  @click.stop.prevent="disabled = false"
                >Terms of Service</a>
                &nbsp;and&nbsp;
                <a
                  href="#"
                  @click.stop.prevent="disabled = false"
                >Privacy Policy</a>*
              </template>
            </v-checkbox>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>

          <v-btn text>Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn :disabled="!disabled" @click="handleCreateRoom" class="white--text" color="deep-purple accent-4" depressed>Submit</v-btn>
        </v-card-actions>

      </v-card>



    </center>
  </v-container>
</template>

<script>
import { get_socket_node } from '../socketConfig';
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'Home',

  created(){
    this.room_id = uuidv4();

    get_socket_node().on('create_room_success' , (args) => {
      console.log('room created successfully!' , args);
      this.$store.state.username = args.admin_name;
      this.$store.state.currentRoom = args.room_id;
      this.$store.state.adminID = get_socket_node().id;
    });

    get_socket_node().on('create_room_error' , (args) => {
      console.log('room error' , args);
    });

  },

  data(){
    return {
      disabled : true,
      display_name : '',
      room_id : 'asd',
      password : '',
      max_users : 4
    }
  },

  methods : {
    handleCreateRoom(){

      if(this.display_name != '' && this.room_id != '' && this.password != '' && this.max_users != null){
        console.log('form submitted!');
        get_socket_node().emit("create_room",  {admin_name : this.display_name , room_id : this.room_id , password : this.password , max_users : this.max_users });
      }else{
        console.log('form has error!');
      }

    }
  }

}
</script>
