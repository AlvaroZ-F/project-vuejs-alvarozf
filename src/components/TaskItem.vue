<template>
    <div class="task-item">
        <div class="container">
            <div class="row">
                <div class="col">
                    <div class="task-item-left">
                        <div class="pretty p-icon p-smooth p-round p-bigger custom-checkbox">
                            <input type="checkbox" v-model="completed" @change="doneEdit">
                            <div class="state p-info">
                                <i class="p-icon material-icons"></i>
                                <label></label>
                            </div>
                        </div>
                        <div v-if="!editing"
                             @dblclick="editTask"
                             class="task-item-label"
                             :class="{ completed : completed }">
                            {{ title }}
                        </div>
                        <input v-else class="task-item-edit" type="text" v-model="title"
                               @blur="doneEdit"
                               @keyup.enter="doneEdit" v-focus
                               @keyup.esc="cancelEdit">
                    </div>                    
                </div>
                <div class="col">
                    <button type="button" class="remove-item close" @click="removeTask(index)">
                        &times;
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <div>
                        <label class="priority-label">Priority: </label>
                        <button class="priority-high btn" :class="{ active: filterPriority == 'high' }" @click="filterPriority = 'high'">High</button>
                        <button class="priority-normal btn" :class="{ active: filterPriority == 'normal' }" @click="filterPriority = 'normal'">Normal</button>
                        <button class="priority-low btn" :class="{ active: filterPriority == 'low' }" @click="filterPriority = 'low'">Low</button>
                    </div>
                </div>
            </div>
        </div>              
    </div>
</template>

<script>

    export default {
        name: 'task-item',
        props: {
            task: {
                type: Object,
                required: true,
            },
            index: {
                type: Number,
                required: true,
            },
            checkAll: {
                type: Boolean,
                required: true,
            }
        },

        data() {
            return {
                'id': this.task.id,
                'title': this.task.title,
                'completed': this.task.completed,
                'editing': this.task.editing,
                'filterPriority': this.task.filterPriority,
                'beforeEditCache': '',
            }            
        },

        watch: {
            checkAll() {
                /*
                if (this.checkAll) {
                    this.completed = true
                } else {
                this.completed = this.task.completed
                }
                */
                this.completed = this.checkAll ? true : this.task.completed
            }
        },
               
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        },

        methods: {
            removeTask(index) {
                this.$emit('removedTask', index)
            },

            editTask() {
                this.beforeEditCache = this.title
                this.editing = true
            },

            doneEdit() {
                if (this.title.trim() == 0) {
                    this.title = this.beforeEditCache
                }
                this.editing = false
                this.$emit('finishedEdit', {
                    'index': this.index,
                    'task': {
                        'id': this.id,
                        'title': this.title,
                        'completed': this.completed,
                        'editing': this.editing,
                        'filterPriority': this.filterPriority,
                    }
                })
            },

            cancelEdit() {
                this.title = this.beforeEditCache
                this.editing = false
            },
        },
    }
</script>