// store/index.js
import Vue from "vue";
import Vuex from "vuex";
import { getAllTask } from "~/data/servicios/service";

Vue.use(Vuex);

export const state = () => ({
  task: {
    id: 0,
    title: "",
    is_completed: 0,
    due_date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    comments: "",
    description: "",
    tags: [],
  },
  tasks: [],
  isValid: false,
  snackBar: false,
  snackBarMsg: "",
});

export const mutations = {
  updateTask(state, payload) {
    state.isValid = payload.title !== "" ? true : false;
    state.task = { ...state.task, ...payload };
    const index = state.tasks.findIndex((task) => task.id === payload.id);
    if (index !== -1) {
      state.tasks[index] = { ...state.tasks[index], ...payload };
    }
  },
  setTasks(state, tasks) {
    state.tasks = tasks;
  },
  updateTasks(state, payload) {
    const exists = state.tasks.some((task) => task.id === payload.id);

    if (exists) {
      const index = state.tasks.findIndex((task) => task.id === payload.id);
      Vue.set(state.tasks, index, { ...payload }); // Actualiza la tabla con el payload
    } else {
      state.tasks.push(payload);
    }
    state.task = {};
  },
  deleteTaskById(state, payload) {
    const index = state.tasks.findIndex((task) => task.id === payload.id);

    if (index !== -1) {
      state.tasks.splice(index, 1);
    }
  },
  searchById(state, payload) {
    if (payload.detail) {
      state.tasks = [];
    } else {
      state.tasks = payload;
    }
  },
  deleteTags(state, payload) {
    state.task.tags.splice(state.task.tags.indexOf(payload), 1);
  },
  setError(state, payload) {
    state.snackBar = true;
    state.snackBarMsg = payload;
  },
};

export const actions = {
  updateTask({ commit }, payload) {
    commit("updateTask", payload);
  },
  async fetchTasks({ commit }) {
    try {
      const tasks = await getAllTask();
      commit("setTasks", tasks);
    } catch (error) {
      throw error;
    }
  },
  updateTasks({ commit }, payload) {
    commit("updateTasks", payload);
  },
  searchById({ commit }, payload) {
    commit("searchById", payload);
  },
  deleteTask({ commit }, payload) {
    commit("deleteTaskById", payload);
  },
  deleteTags({ commit }, payload) {
    commit("deleteTags", payload);
  },
  setError({ commit }, payload) {
    commit("setError", payload);
  },
};

export const getters = {
  task(state) {
    return state.task;
  },
  tasks(state) {
    return state.tasks;
  },
  isValid(state) {
    return state.isValid;
  },
  SnackBarVal(state) {
    return state.snackBar;
  },
  SnackBarMsgVal(state) {
    return state.snackBarMsg;
  },
};
