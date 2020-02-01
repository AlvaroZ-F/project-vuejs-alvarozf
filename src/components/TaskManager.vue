<template>
  <div>
    <input type="text" class="task-manager-input" placeholder="What needs to be done" v-model="newTask" @keyup.enter="addTask">
    <div v-for="(task, index) in tasks" :key="task.id" class="task-item">
      <div>
        <div>{{ task.title }}</div>
        <input type="text" v-model="task.title">        
      </div>
      <div class="remove-item" @click="removeTask(index)">
        &times;
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "task-manager",
  data () {
    return {
      newTask: '',
      idForTask: 3,
      tasks: [
        {
          'id': 1,
          'title': 'Finish Vue Screencast',
          'completed': false
        },
        {
          'id': 2,
          'title': 'Take over world',
          'completed': false
        }
      ]
    }
  },
  methods: {
    addTask() {

      if (this.newTask.trim().lenght == 0) {
        return
      }

      this.tasks.push({
        id: this.idForTask,
        title: this.newTask,
        completed: false,
      })

      this.newTask = ''
      this.idForTask++
    },
    removeTask(index) {
      this.tasks.splice(index, 1)
    }
  }
};
</script>


<style lang="scss">

  .task-manager-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

    &:focus {
      outline: 0;
    }
  }

  .task-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .remove-item {
    cursor: pointer;
    align: right;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
  
</style>