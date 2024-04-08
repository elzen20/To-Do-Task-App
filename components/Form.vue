<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="title" :counter="50" :rules="titleRules" label="Titulo" required></v-text-field>
        <v-checkbox v-model="is_completed" label="¿Completada?"></v-checkbox>
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="computedDueDate"
            transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="computedDueDate" label="Selecciona la fecha en la quieres hacer la tarea"
                    prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="computedDueDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                    Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(computedDueDate)">
                    OK
                </v-btn>
            </v-date-picker>
        </v-menu>
        <v-textarea name="comentarios" label="Comentarios" v-model="comments" hint="Hint text"></v-textarea>
        <v-text-field v-model="description" :counter="10" label="Descripcion"></v-text-field>
        <v-combobox v-model="tags" chips clearable label="Agrega algun tag" multiple prepend-icon="mdi-filter-variant"
            solo>
            <template v-slot:selection="{ attrs, item, select, selected }">
                <v-chip v-bind="attrs" :input-value="selected" close @click="select" @click:close="remove(item)">
                    <strong>{{ item }}</strong>&nbsp;
                </v-chip>
            </template>
        </v-combobox>
        <v-btn :disabled="!valid" class="mr-4" @click="validate">
            Validate
        </v-btn>
        <v-btn class="mr-4" @click="reset">
            Reset Form
        </v-btn>
    </v-form>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: 'Form',
    data: () => ({
        menu: false,
        modal: false,
        menu2: false,
        valid: true,
        titleRules: [
            v => !!v || 'El Titulo es requerido',
        ],
        select: null,
    }),
    computed: {
        ...mapState(['task']),
        //Los siguientes metodos le mandaron los valores a las propiedades del objeto task
        title: {
            get() {
                return this.task.title
            },
            set(value) {
                this.updateTask({ title: value })
            }
        },
        is_completed: {
            get() {
                return this.task.is_completed
            },
            set(value) {
                this.updateTask({ is_completed: value ? 1 : 0 })
            }
        },
        computedDueDate: {
            get() {
                return this.task.due_date
            },
            set(value) {
                this.updateTask({ due_date: value })
            }
        },
        comments: {
            get() {
                return this.task.comments
            },
            set(value) {
                this.updateTask({ comments: value })
            }
        },
        description: {
            get() {
                return this.task.description
            },
            set(value) {
                this.updateTask({ description: value })
            }
        },
        tags: {
            get() {
                return this.task.tags
            },
            set(value) {
                this.updateTask({ tags: value })
            }
        },
    },
    methods: {
        ...mapActions(['updateTask']),
        ...mapActions(['deleteTags']),
        ...mapActions(['validate']),
        remove(item) {
            this.deleteTags(item)
        },
        validate() {
            this.$refs.form.validate()
        },
        reset() {
            this.$refs.form.reset()
        },
    },
}
</script>
