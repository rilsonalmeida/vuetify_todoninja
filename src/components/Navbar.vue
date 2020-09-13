<template>
  <nav>
      <v-snackbar v-model="snackbar" top :timeout="4000" color="success">
          <span>Awesome ! You added a new project!</span>
          <v-btn text color="white" @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-app-bar text app>
          <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title class="text-uppercase grey--text">
              <span class="font-weight-light">Todo</span>
              <span>Ninja</span>
          </v-toolbar-title>
          <v-spacer/>

        <!-- dropdown menu -->

        <div class="text-center">
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn text color="grey" v-bind="attrs" v-on="on">
                      <v-icon left>mdi-chevron-down</v-icon>
                      <span>Menu</span>
                    </v-btn>
                </template>
                <v-list>
                  <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-title>{{ link.text }}</v-list-item-title>
                  </v-list-item>
                </v-list>
            </v-menu>
        </div>    
        <v-btn text color="grey">
            <span>Sign out</span>
              <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" class="primary">
      <v-row class="mt-5 text-center">
        <v-col>
            <v-avatar size="100">
                <img src="/avatar-1.png">
            </v-avatar>
            <p class="white--text subtitle-1 mt-1">The Net Ninja</p>
        </v-col>
        <v-col class="mt-4 mb-3">
            <Popup @projectAdded="snackbar = true"/>
        </v-col>
       </v-row>
       <v-list>
           <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
               <v-list-item-action>
                    <v-icon class="white--text">{{link.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="white--text">
                       {{link.text}}
                    </v-list-item-title>
                </v-list-item-content>
           </v-list-item>
       </v-list>

    </v-navigation-drawer>
  </nav>
</template>

<script>
import Popup from './Popup'
export default {
    components: {
        Popup
    },
    data() {
        
        return {
            drawer: false,
            showMenu: true,
            links: [
                {icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/'},
                {icon: 'mdi-folder', text: 'My Projects', route: '/projects'},
                {icon: 'mdi-account', text: 'Team', route: '/team'}
            ],
            snackbar: false
        }
    }
}
</script>
