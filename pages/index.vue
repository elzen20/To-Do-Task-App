<template>
  <v-data-table :headers="headers" :items="tasks" class="elevation-1">
    <template v-slot:top>
      <v-toolbar>
        <v-text-field v-model="search" append-icon="mdi-magnify" label="Busca ID Tarea" single-line hide-details
          @click:append="searchItems"></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn dark class="mb-2" v-bind="attrs" v-on="on">
              Agrega Tarea
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <Form></Form>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" :disabled="!isValid" text @click="save">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="fetchTasks">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Form } from "@/components/Form"
import { postTask, updateTask, deleteTaskById, getTaskById } from "~/data/servicios/service";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Título',
        align: 'start',
        sortable: false,
        value: 'title',
      },
      { text: 'Completada o no completada', value: 'is_completed' },
      { text: 'Fecha', value: 'due_date' },
      { text: 'Comentarios', value: 'comments' },
      { text: 'Descripción', value: 'description' },
      { text: 'Tags', value: 'tags' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    search: '',
    editedIndex: -1,
    editedItem: {
      title: '',
      is_completed: 0,
      due_date: 0,
      comments: 0,
      description: 0,
      tags: ''
    },
    defaultItem: {
      title: '',
      is_completed: 0,
      due_date: 0,
      comments: 0,
      description: 0,
      tags: ''
    },
  }),
  computed: {
    ...mapGetters(['task', 'tasks', 'isValid']),
    formTitle() {
      return this.editedIndex === -1 ? 'Nueva Tarea' : 'Editar Tarea'
    },
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    ...mapActions(['updateTask', 'updateTasks', 'fetchTasks', 'deleteTask', 'searchById', 'setError']),
    async searchItems() {
      try {
        const response = await getTaskById(this.search);
        this.searchById(response);
      } catch (error) {
        console.error('Error al buscar elementos:', error);
      }
    },
    editItem(item) {
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
      this.updateTask({ title: item.title, id: item.id, is_completed: item.is_completed, comments: item.comments, description: item.description, tags: item.tags })
      // Ayuda a mandarle los datos existentes al componente Form.vue
    },
    deleteItem(item) {
      this.updateTask({ ...item })
      this.editedIndex = this.tasks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      this.deleteTask(this.task)
      await deleteTaskById(this.task.id)
      this.closeDelete()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async save() {
      //Guarda los datos del task en el arreglo tasks dependiendo 
      //si es nuevo el registro o si es una actualizacion al registro
      try {
        if (this.editedIndex > -1) {
          const response = await updateTask(this.task, this.task.id);
          if (response.detail.includes("Error")) {
            this.setError(response.detail);
          } else {
            await this.updateTasks(this.task);
          }
        } else {
          const response = await postTask(this.task)
          if (response.detail.includes("Error")) {
            this.setError(response.detail);
          } else {
            await this.updateTasks(this.task);
          }
        }
        this.close()
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
