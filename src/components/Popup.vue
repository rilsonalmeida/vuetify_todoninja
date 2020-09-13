<template>
    <!-- <v-dialog max-width="600px">
        <v-btn text class="success">Add new project</v-btn>
        <v-card>
            <v-card-title>
                <h2>Add a new project</h2>
            </v-card-title> 
        </v-card>
    </v-dialog> -->

<div class="text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Add new project
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Add a new project
        </v-card-title>

        <v-card-text>
         <v-form class="px-3" ref="form">
            <v-text-field label="Title" v-model="title" 
                :rules="inputRules"
                prepend-icon="mdi-folder"></v-text-field>
            <v-textarea label="Information" v-model="content" 
                prepend-icon="mdi-pencil"
                :rules="inputRules"
                ></v-textarea>
            <v-menu>
                <template v-slot:activator="{ on }">
                <v-text-field label="Due date" 
                    :rules="inputRules"
                    prepend-icon="mdi-calendar-range" 
                    :value="formattedDate">
                </v-text-field>
                <template>
                    <v-row justify="center">
                        <v-date-picker v-model="due" v-on="on"></v-date-picker>
                    </v-row>
                </template>    
                </template>            
            </v-menu>
            


             <v-btn text color="primary" class="mx-0 mt-3" @click="submit" :loading="loading">Add project</v-btn>
         </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="success"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import db from '@/fb'
import moment from 'moment'
export default {
    data() {
        return {
            title: '',
            content: '',
            due: null,
            inputRules: [
                v => v.length >=3 || 'Mimimum length is 3 characters'
            ],
            loading: false,
            dialog: false
        }
    },
    computed: {
        formattedDate() {
            return this.due ? moment(this.due).format("Do MMMM YYYY") : ""
        }
    },
    methods: {
        submit() {
            if(this.$refs.form.validate()) {
                this.loading = true
                const project = {
                  title: this.title,
                  content: this.content, 
                  due: moment(this.due).format("Do MMMM YYYY"),
                  person: 'The Net Ninja',
                  status: 'ongoing'
                }

                db.collection('projects').add(project).then(() => {
                  // console.log('added to Firebase db!')
                  this.loading = false
                  this.dialog = false
                  this.$emit('projectAdded')
                })
            }
        }
    }
}
</script>