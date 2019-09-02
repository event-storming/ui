<template>
  <v-app id="keep">
    <v-app-bar
            app
            clipped-left
            color="amber"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5">12&nbsp;<span class="font-weight-light">Street</span></span>
      <!--<v-text-field-->
              <!--solo-inverted-->
              <!--flat-->
              <!--hide-details-->
              <!--label="Search"-->
              <!--prepend-inner-icon="search"-->
      <!--&gt;</v-text-field>-->
      <div class="flex-grow-1"></div>
      <v-btn text @click="dialog = true">Login</v-btn>
      <v-btn text>
        <v-icon>perm_identity</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
            v-model="drawer"
            app
            clipped
            color="grey lighten-4"
    >
      <v-list
              dense
              class="grey lighten-4"
      >
        <template v-for="(item, i) in items">
          <v-row
                  v-if="item.heading"
                  :key="i"
                  align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
                    cols="6"
                    class="text-right"
            >
              <v-btn
                      small
                      text
              >edit</v-btn>
            </v-col>
          </v-row>
          <v-divider
                  v-else-if="item.divider"
                  :key="i"
                  dark
                  class="my-4"
          ></v-divider>
          <v-list-item
                  v-else
                  :key="i"
                  @click=""
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="grey--text">
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-dialog
            v-model="dialog"
            width="500"
    >
      <Login></Login>
    </v-dialog>
    <v-content>
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
            login: Boolean
        },
        data: () => ({
            drawer: null,
            dialog: false,
            items: [
                { icon: 'touch_app', text: 'Reminders' },
                { icon: 'lightbulb_outline', text: 'Notes' },
                { divider: true },
                { heading: 'Labels' },
                { icon: 'add', text: 'Create new label' },
                { divider: true },
                { icon: 'archive', text: 'Archive' },
                { icon: 'delete', text: 'Trash' },
                { divider: true },
                { icon: 'settings', text: 'Settings' },
                { icon: 'chat_bubble', text: 'Trash' },
                { icon: 'help', text: 'Help' },
                { icon: 'phonelink', text: 'App downloads' },
                { icon: 'keyboard', text: 'Keyboard shortcuts' },
            ],
        }),
    }
</script>

<style>
  #keep .v-navigation-drawer__border {
    display: none
  }
</style>
