<template>
    <div class="container">
        <!-- ADD TASK INPUT -->
        <input type="text" class="form-control task-manager-input" 
               placeholder="What needs to be done" 
               v-model="newTask" 
               @keyup.enter="addTask" />
        <!-- END OF INPUT -->

        <div class="extra-container">
            <div class="pretty p-switch p-fill">
                <input type="checkbox" :checked="!anyRemaining" @change="checkAllTasks">
                <div class="state label">
                    <label>Check All</label>
                </div>
            </div>
            <div class="label">{{ remaining }} items left</div>
        </div>

        <!-- FILTERS ALL/ACTIVE/COMPLETED -->
        <div class="extra-container">
            <div>
                <button class="btn" :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
                <button class="btn" :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
                <button class="btn btn-completed" :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
            </div>

            <div>
                <transition name="fade">
                    <button class="btn btn-clearCompleted" v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
                </transition>
            </div>
        </div>
        <!-- END FILTERS -->

        <!-- SEARCH INPUT CONTAINER. HIDDEN BY DEFAULT-->
        <div class="search-container">
            <button type="button" class="btn btn-hidden-search"
                    @click="searchIsHidden = !searchIsHidden">
                Search
            </button>
            <transition name="fade">
                <input v-if="!searchIsHidden" type="text"
                       class="form-control task-manager-search"
                       placeholder="Filter my tasks..."
                       v-model="searchword" />
            </transition>
        </div>
        <!-- END SEARCH INPUT CONTAINER-->
        <transition-group tag="div" name="fade"
                          enter-active-class="animatedfadeInUp"
                          leave-active-class="animated fadeOutDown">
            <!-- TASK CONTAINER -->
            <task-item v-for="(task, index) in tasksFiltered"
                       :key="task.id"
                       :task="task"
                       :index="index"
                       :checkAll="!anyRemaining" @removedTask="removeTask"
                       @finishedEdit="finishedEdit">
            </task-item>
            <!-- END OF TASK CONTAINER -->
        </transition-group>
        <footer>
            <div class="custom-footer footer-copyright text-center text-grey-50 py-3">
                @ 2020 Alvaro Zambrana Fernandez -
                <a class="dark-grey-text" href="https://github.com/AlvaroZ-F/project-vuejs-alvarozf.git">Github</a>
            </div>
        </footer>
    </div>
</template>

<script>
    import TaskItem from './TaskItem'

    export default {
        name: "task-manager",

        components: {
            TaskItem,
        },

        data () {
            return {
                searchword: '',
                newTask: '',
                idForTask: 1,
                beforeEditCache: '',
                searchIsHidden: true,
                filter: 'all',

                tasks: []
            };
        },

        watch: {
            tasks: {
                handler() {
                    console.log('Tasks changed!');
                    localStorage.setItem('tasks', JSON.stringify(this.tasks));
                },
                deep: true,
            },
        },

        computed: {
            remaining() {
                return this.tasks.filter(task => !task.completed).length
            },
            anyRemaining() {
                return this.remaining != 0
            },
            tasksFiltered() {
                if (!this.searchIsHidden) {
                    if (this.filter == 'all') {
                        return this.tasks.filter(task => {
                            return task.title.toLowerCase().includes(this.searchword.toLowerCase())
                        });
                    } else if (this.filter == 'active') {
                        return this.tasks.filter(task => {
                            if (!task.completed && task.title.toLowerCase().includes(this.searchword.toLowerCase())) {
                                return true;
                            }
                        });
                    } else if (this.filter == 'completed') {
                        return this.tasks.filter(task => {
                            if (task.completed && task.title.toLowerCase().includes(this.searchword.toLowerCase())) {
                                return true;
                            }
                        });
                    }
                } else {
                    if (this.filter == 'all') {
                        return this.tasks
                    } else if (this.filter == 'active') {
                        return this.tasks.filter(task => !task.completed)
                    } else if (this.filter == 'completed') {
                        return this.tasks.filter(task => task.completed)
                    }
                }
                return this.tasks
            },
            showClearCompletedButton() {
                return this.tasks.filter(task => task.completed).length > 0
            },
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
                    filterPriority: 'normal',
                })

                this.newTask = ''
                this.idForTask++
            },

            removeTask(index) {
                this.tasks.splice(index, 1)
            },

            checkAllTasks() {
                this.tasks.forEach((task) => task.completed = event.target.checked)
            },

            clearCompleted() {
                this.tasks = this.tasks.filter(task => !task.completed)
            },

            finishedEdit(data) {
                this.tasks.splice(data.index, 1, data.task)
            }
        },

        mounted() {
            console.log('App mounted');
            if (localStorage.getItem('tasks')) this.tasks = JSON.parse(localStorage.getItem('tasks'));
        },
    };
</script>


<style lang="scss">
    @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css");
    @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
    @import url("https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css");

    body {
        background-color: #111;
    }

    .task-manager-input {
        width: 100%;
        padding: 10px 18px;
        font-size: 18px;
        margin-bottom: 16px;

        &:focus {
            outline: 0;
        }
    }

    .task-manager-search {
        width: 80%;
        padding: 10px 16px;
        font-size: 16px;
        margin-top: 6px;
        margin-left: 14px;
        &:focus {
            outline: 0;
        }
    }

    .task-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #777;
        background: #222;
        color: #aaa;
    }

    .remove-item {
        cursor: pointer;
        font-size: 50px;
        margin-left: 14px;
        &:hover {
        color: white;
        }
    }

    .task-item-left {
        display: flex;
        align-items: center;
    }

    .task-item-label {
        padding-top: 10px;
        margin-left: 6px;
    }

    .task-item-edit {
        font-size: 20px;
        color: #2c3e50;
        margin-left: 12px;
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        font-family: "Avenir", Helvetica, Arial, sans-serif;

        &:focus {
        outline: none;
        }
    }

    .completed {
        text-decoration: line-through;
        color: #5fe39f;
    }

    .extra-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 16px;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        margin-bottom: 14px;
    }

    .search-container {
        display: flex;
        border-top: 1px solid lightgrey;
        padding-top: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid lightgrey;
    }

    button {
        font-size: 14px;
        background-color: white;
        appearance: none;
        border: 2px solid black;

        &:focus {
            outline: none;
        }
    }

    .btn {
        margin:5px;
        background: #444;
        color: #888;
        padding: 0px;
        height: 20px;
        width: 40px;
        font-size: 10px;
        text-align: center;
        font-weight: bold;

        &.btn-completed {
            width: 60px;
        }
    }

    .btn-clearCompleted {
        width: 100px;
    }

    .btn-hidden-search {
        width: 60px;
        height: 40px;
        font-size: 14px;
        background: #666;
    }

    .custom-checkbox {
        margin-top: 10px;
        margin-left: 20px;
    }

    .label {
        color: #777;
        font-weight: bold;
    }

    .active {
        background: lightgreen;
        &.priority-high{
            color: white;
            padding: 0px;
            height: 20px;
            width: 40px;
            font-size: 10px;
            text-align: center;
            font-weight: bold;
            background: #ed4545;
        }
        &.priority-normal {
            color: white;
            padding: 0px;
            height: 20px;
            width: 40px;
            font-size: 10px;
            text-align: center;
            font-weight: bold;
            background: #406cdb;
        }

        &.priority-low {
            color: white;
            padding: 0px;
            height: 20px;
            width: 40px;
            font-size: 10px;
            text-align: center;
            font-weight: bold;
            margin:5px;
            background: #45d4ff;
        }
    }

    .remove-item {
        color: #ed4545;
        margin-right: 10px;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .priority-label {
        font-size: 14px;
        padding: 4px;
    }

    .custom-footer {
        font-size: 15px;
        color: #808080;
        a {
            color: #BBB;
        }
    }
</style>