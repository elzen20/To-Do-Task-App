<template>
  <v-data-table :headers="headers" :items="tareas" :items-per-page="5" class="elevation-1"></v-data-table>
</template>

<script>

import { getAllTask } from "~/data/servicios/service";
export default {
  name: 'IndexPage',
  data() {
    return {
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
      ],
      tareas: [],
    }
  },
  async mounted() {

    await getAllTask()
    .then(response => {
        this.tareas = response;
      })
      .catch(error => {
        // Manejar errores
        console.error('Error al obtener los datos:', error);
      });
  }
}
</script>
