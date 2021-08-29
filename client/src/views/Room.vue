<template>

  <v-container>
    
    <v-row>

        <v-col cols="12" md="4">
            
            <v-card>

                <v-toolbar
                    color="cyan"
                    dark
                >
                    <v-toolbar-title>Live Chat</v-toolbar-title>

                </v-toolbar>


                <v-list three-line height="600px" style="overflow-y : scroll;">

                    <v-list-item v-for="(item , index) in this.message_list" :key="index">

                        <v-list-item-avatar>
                            <v-icon style="font-size : 40px;" >mdi-account-circle </v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-html="item.arg.sender_username"></v-list-item-title>
                            <v-list-item-subtitle v-html="item.arg.message"></v-list-item-subtitle>
                            <hr/>
                        </v-list-item-content>

                    </v-list-item>


                </v-list>

                <v-container>

                    <v-form>

                        <v-text-field
                            v-model="message_text"
                            @click:append-outer="sendMessage"
                            filled
                            append-outer-icon="mdi-send"
                            clear-icon="mdi-close-circle"
                            clearable
                            label="Message"
                            type="text"
                        ></v-text-field>


                    </v-form>

                </v-container>

            </v-card>


        </v-col>

        <v-col cols="12" md="4">
            
            <v-card>

                <v-container>

                    <audio style="width : 100% "  controls>
                        <source src="http://www.mlk4.info/audio/71000/Ruwaththiye-Hashan-Balasuriya-musiclk-audio.mp3" type="audio/mpeg">
                    </audio>

                </v-container>

            </v-card><br/>

            <v-card>

                 
                
               

                <v-container>

                    <v-list flat>

                        <v-subheader>
                            <h3>Music List(10)</h3>

                            <v-spacer></v-spacer>

                            <UploadMusicDialog />

                        </v-subheader>

                        <v-list-item-group color="primary">

                            <v-list-item>

                                <v-list-item-icon>
                                    <v-icon v-text="'mdi-music-circle '"></v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title v-text="'Sample Music File'"></v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>

                        </v-list-item-group>

                    </v-list>

                </v-container>
            </v-card><br />

            <v-card>

                <v-toolbar
                    color="cyan"
                    dark
                >
                    <v-toolbar-title>Users Online</v-toolbar-title>

                </v-toolbar>


                <v-container>
                
                    <v-list height="19vh" style="overflow-y : scroll">

                        <v-subheader>Users Online({{this.users_list.length}})</v-subheader>


                        <v-list-item v-for="(item , index) in this.users_list" :key="index">

                            <v-list-item-avatar>
                                <v-icon style="font-size : 30px;" >mdi-account-circle </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title v-html="item.username"></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action v-if="$store.state.adminID != '' && $store.state.adminID != item.id " >

                                <v-btn @click="handleKickUser(item.id)" icon>
                                    
                                    <v-icon color="gold">mdi-exit-to-app </v-icon>

                                </v-btn>
                                
                            </v-list-item-action>

                        </v-list-item>

                    </v-list>

                </v-container>
            </v-card>


        </v-col>

        <v-col  cols="12" md="4" >
           
            <v-card >

                <v-subheader>Current Music</v-subheader>

                <v-row class="text-center mt-1">

                    <v-col cols="12" md="6">
                        <v-btn class="ml-1 " width="100%"  outlined color="indigo" >Vote For Skip (5)</v-btn>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-btn class="mr-1 "  width="100%" outlined color="indigo" >Stop (10)</v-btn>
                    </v-col>

                </v-row>

            </v-card><br />

            <v-card>

                <v-toolbar
                    color="pink"
                    dark
                >

                    <v-toolbar-title>VOTE</v-toolbar-title>

                    <v-spacer></v-spacer>

                    <v-btn icon>
                        <v-icon>mdi-checkbox-marked-circle</v-icon>
                    </v-btn>

                </v-toolbar>

                <v-list height="400px" style="overflow-y:scroll;" two-line>
                    <v-list-item-group
                        v-model="selected"
                        active-class="pink--text"
                    >
                        <template>

                            <v-list-item >

                                <template v-slot:default="{ active }">

                                    <v-list-item-content>
                                        <v-list-item-title v-text="'Sample Title'"></v-list-item-title>

                                        <v-list-item-subtitle
                                            class="text--primary"
                                            v-text="'headline'"
                                        ></v-list-item-subtitle>

                                        <v-list-item-subtitle v-text="'Sample subtitile'"></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>

                                        <v-list-item-action-text v-text="'sample action'"></v-list-item-action-text>

                                        <v-icon
                                            v-if="!active"
                                            color="grey lighten-1"
                                        >
                                            mdi-star-outline
                                        </v-icon>

                                        <v-icon
                                            v-else
                                            color="yellow darken-3"
                                        >
                                            mdi-star
                                        </v-icon>

                                    </v-list-item-action>
                                </template>
                            </v-list-item>

                            <v-list-item >

                                <template v-slot:default="{ active }">

                                    <v-list-item-content>
                                        <v-list-item-title v-text="'Sample Title'"></v-list-item-title>

                                        <v-list-item-subtitle
                                            class="text--primary"
                                            v-text="'headline'"
                                        ></v-list-item-subtitle>

                                        <v-list-item-subtitle v-text="'Sample subtitile'"></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>

                                        <v-list-item-action-text v-text="'sample action'"></v-list-item-action-text>

                                        <v-icon
                                            v-if="!active"
                                            color="grey lighten-1"
                                        >
                                            mdi-star-outline
                                        </v-icon>

                                        <v-icon
                                            v-else
                                            color="yellow darken-3"
                                        >
                                            mdi-star
                                        </v-icon>

                                    </v-list-item-action>
                                </template>
                            </v-list-item>

                            <v-list-item >

                                <template v-slot:default="{ active }">

                                    <v-list-item-content>
                                        <v-list-item-title v-text="'Sample Title'"></v-list-item-title>

                                        <v-list-item-subtitle
                                            class="text--primary"
                                            v-text="'headline'"
                                        ></v-list-item-subtitle>

                                        <v-list-item-subtitle v-text="'Sample subtitile'"></v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>

                                        <v-list-item-action-text v-text="'sample action'"></v-list-item-action-text>

                                        <v-icon
                                            v-if="!active"
                                            color="grey lighten-1"
                                        >
                                            mdi-star-outline
                                        </v-icon>

                                        <v-icon
                                            v-else
                                            color="yellow darken-3"
                                        >
                                            mdi-star
                                        </v-icon>

                                    </v-list-item-action>
                                </template>
                            </v-list-item>

                        

                        </template>

                    </v-list-item-group>
                </v-list>

            </v-card>

        </v-col>

    </v-row>

  </v-container>


</template>

<script>

    import { get_socket_node } from '../socketConfig';
    import UploadMusicDialog from '../components/Room/UploadMusicDialog.vue';

    export default {

        components : {
            UploadMusicDialog
        },

        created(){

            console.log('craeted');

            get_socket_node().on('user_left_event' , (arg) => {
                console.log('user left' , arg);
                this.users_list = arg;
            });

            get_socket_node().on('user_join_event' , (arg) => {
                console.log('user join' , arg);
                this.users_list = arg;
            });

            get_socket_node().on('room_remove_event' , () => {
                get_socket_node().emit('user_leave_room_request' , this.$store.state.currentRoom);
                this.$store.state.currentRoom = '';
                this.$store.state.username = '';
                this.$store.state.adminID = '';
                this.$router.replace('/');
            })

            get_socket_node().emit('get_room_user_list' , this.$store.state.currentRoom);
            get_socket_node().on('room_user_list_response' , (arg) => {
                console.log(arg);
                this.users_list = arg;
            });


            get_socket_node().on('admin_kicked' , () => {
                this.$store.state.currentRoom = '';
                this.$store.state.username = '';
                this.$store.state.adminID = '';
                this.$router.replace('/');
            });

            get_socket_node().on('receive_message' , (arg) => {
                console.log('the data is ' , arg);
                this.message_list.push(arg);
                console.log('the array is ' , this.message_list);
            })

        },

        methods : {

            handleKickUser(userid){
                console.log('the user id is ' , userid);
                get_socket_node().emit('request_kick_user' , { user_id : userid , room_id : this.$store.state.currentRoom});
            },

            sendMessage(){
                console.log('the text is ' , this.message_text);
                if(this.message_text != ''){
                    get_socket_node().emit('send_message_request' , {sender_username : this.$store.state.username , message : this.message_text , room_id :  this.$store.state.currentRoom});
                    this.message_text = '';
                }
            }

        },

        data(){
            return {
                selected : false,
                users_list : [],
                message_list : [],
                userSocketID : get_socket_node().id,
                message_text : '',
            }
        }

    }

</script>
