<template>
    <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="titulo" :counter="10" :rules="nameRules" label="Titulo" required></v-text-field>
        <v-checkbox v-model="checkbox" label="¿Completada?" required></v-checkbox>
        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
            transition="scale-transition" offset-y min-width="auto">
            <template v-slot:activator="{ on, attrs }">
                <v-text-field v-model="date" label="Selecciona la fecha en la quieres hacer la tarea"
                    prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                    Cancel
                </v-btn>
                <v-btn text color="primary" @click="$refs.menu.save(date)">
                    OK
                </v-btn>
            </v-date-picker>
        </v-menu>
        <v-textarea name="comentarios" label="Comentarios" :value="comentarios" hint="Hint text"></v-textarea>
        <v-text-field v-model="descripcion" :counter="10" label="Descripcion"></v-text-field>
        <v-combobox v-model="chips" chips clearable label="Agrega algun tag" multiple prepend-icon="mdi-filter-variant"
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
export default {
    data: () => ({
        date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
        menu: false,
        modal: false,
        menu2: false,
        valid: true,
        titulo: '',
        comentarios: '',
        chips: [],
        items: [],
        nameRules: [
            v => !!v || 'Name is required',
            v => (v && v.length <= 10) || 'Name must be less than 10 characters',
        ],
        fecha: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        select: null,
        items: [
            'Item 1',
            'Item 2',
            'Item 3',
            'Item 4',
        ],
        checkbox: false,
    }),

    methods: {
        remove(item) {
            this.chips.splice(this.chips.indexOf(item), 1)
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