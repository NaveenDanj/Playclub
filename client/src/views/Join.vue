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
              label="Room ID"
              style="min-height: 96px"
              type="text"
            ></v-text-field>

            <v-text-field
              filled
              color="deep-purple"
              label="Password"
              type="password"
            ></v-text-field>

            <v-checkbox
              color="deep-purple"
            >
              <template v-slot:label>
                I agree to the&nbsp;
                <a
                  href="#"
                  @click.stop.prevent="dialog = true"
                >Terms of Service</a>
                &nbsp;and&nbsp;
                <a
                  href="#"
                  @click.stop.prevent="dialog = true"
                >Privacy Policy</a>*
              </template>
            </v-checkbox>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>

          <v-btn text>Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="white--text" color="deep-purple accent-4" depressed>Submit</v-btn>
        </v-card-actions>

      </v-card>

    </center>
  </v-container>
</template>

<script>

export default {
  name: 'Join',
  
}
</script>
