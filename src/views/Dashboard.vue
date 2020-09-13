<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>

    <v-container class="my-5">
      
      <v-row flat class="mb-3">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('title')" v-on="on">
              <v-icon left small>mdi-folder</v-icon>
              <span right class="caption text-lowercase">by project name</span>
            </v-btn>
          </template>
          <span>Sorts projects by name</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('person')" v-on="on">
              <v-icon left small>mdi-account</v-icon>
              <span right class="caption text-lowercase">by person</span>
            </v-btn>
          </template>
          <span>Sorts projects by person</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('status')" v-on="on">
              <v-icon left small>mdi-timelapse</v-icon>
              <span right class="caption text-lowercase">by status</span>
            </v-btn>
          </template>
          <span>Sorts projects by status</span>
        </v-tooltip>   
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn small text color="grey" @click="sortBy('due')" v-on="on">
              <v-icon left small>mdi-calendar-clock</v-icon>
              <span right class="caption text-lowercase">by due</span>
            </v-btn>
          </template>
          <span>Sorts projects by due</span>
        </v-tooltip>                
      </v-row>

      <v-card flat v-for="project in projects" :key="project.id">
        <v-row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project title</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <div class="right">
              <v-chip small :color="`${project.status}`" 
                            :class="`v-chip--active white--text caption my-2`">
                {{project.status}}
              </v-chip>              
            </div>
          </v-flex>
        </v-row>
        <v-divider></v-divider>
      </v-card>

    </v-container>
   
  </div>
</template>

<script>
import db from '@/fb'
import moment from 'moment'
export default {
  data() {
    return {
      projects: []
    }
  }, 
  methods: {
    sortBy(prop) {
      if(prop == 'due') {
        
        // this.projects.sort((a,b) => moment(a).isBefore(moment(b))? -1 :1)
        this.projects.sort((a,b) => moment(a.due , 'Do MMMM YYYY').isBefore(moment(b.due, 'Do MMMM YYYY' ))? -1 :1)
      } 
      else {
        this.projects.sort((a,b) => a[prop] < b[prop]? -1 :1)
      }
      }
    },
    created() {
      db.collection('projects').onSnapshot(res => {
        const changes = res.docChanges();
        
        changes.forEach(change => {
          if(change.type === 'added') {
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id
              }
            )
          }

        })
      })
    }
  }

</script>

<style>
.project.complete{
  border-left: 4px solid #3cd1c2;
}
.project.ongoing{
  border-left: 4px solid #ffaa2c;
}
.project.overdue{
  border-left: 4px solid #f83e70;
}
.v-chip.complete{
  background: #3cd1c2;
}
.v-chip.ongoing{
  background: #ffaa2c;
}
.v-chip.overdue{
  background: #f83e70;
}
</style>