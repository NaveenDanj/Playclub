
<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        
         <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-cloud-upload </v-icon>
        </v-btn>

      </template>

      <v-card>

        <form @submit="handleUploadFile">

          <v-card-title class="text-h5 grey lighten-2">
            Upload Music File
          </v-card-title>

          <v-card-text>
            
            <v-container>

              <v-file-input
                v-model="file"
                name="music_file"
                label="File input"
                outlined
                dense
                class="mt-5"
                accept="audio/*"
              ></v-file-input>

            </v-container>

          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="dialog = false"
            >
              CANCEL
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              type="submit"
            >
              Upload
            </v-btn>

          </v-card-actions>

        </form>

      </v-card>

    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        file : null,
      }
    },

    methods :  {
      handleUploadFile(e){

        e.preventDefault();

        let formData = new FormData();
        formData.append('music_file' , this.file);
        formData.append('test_data' , 'this is a test data');

        fetch('http://localhost:5555/upload' , {
          method : 'POST',
          body : formData,

        })
        .then(response=>response.json())
        .then(data=>{ console.log(data); })
        .catch(err => console.log('the error is ' , err));

      }
    }


  }
</script>