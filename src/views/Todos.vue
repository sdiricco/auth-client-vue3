<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useTodoStore } from "@/stores/todo"
import { storeToRefs } from "pinia";
const todoStore = useTodoStore()

const { userTodoList } = storeToRefs(todoStore)

const title = ref('')
const content = ref('')
const tempTodoId = ref('')

const saveTodo = async (evt: any) => {
  evt.preventDefault()
  if (tempTodoId.value) {
    await todoStore.updateUserTodo(tempTodoId.value, { title: title.value, content: content.value })
  }
  else {
    await todoStore.createUserTodo({ title: title.value, content: content.value })
  }
  title.value = ''
  content.value = ''
  tempTodoId.value = ''
  await todoStore.getAllUserTodos()
}

const deleteTodo = async (todoId: string) => {
  await todoStore.deleteUserTodo(todoId)
  await todoStore.getAllUserTodos()
}

const requestEditTodo = async (todoId: string, data: {title:string, content: string}) => {
  title.value = data.title
  content.value = data.content
  tempTodoId.value = todoId
}

onMounted(async () => {

  await todoStore.getAllUserTodos()
})
</script>

<template>

  <div class="border-bottom-1 py-4">
    <div class="font-bold mb-3">
      Aggiungi un todo
    </div>
    <form class="w-2" @submit="saveTodo">
      <div class="mb-3 flex flex-column">
        <label for="title" class="form-label">Title</label>
        <input type="text" class="form-control" id="todo" v-model="title">
      </div>
      <div class="mb-3 flex flex-column">
        <label for="content" class="form-label">Content</label>
        <input type="text" class="form-control" id="content" v-model="content">
      </div>
      <button type="submit" class="btn btn-primary">Salva</button>
    </form>
  </div>
  <div class="py-4">
    <div class="text-xl">Todo List</div>
  </div>
  <div class="grid grid-nogutter">
    <div class="mr-4 col-3 shadow-2 p-4" v-for="todo in userTodoList" :key="todo._id">
      <div class="pb-4">
        <div class="font-bold mb-2">
          {{ todo.title }}
        </div>
        <div>
          {{ todo.content }}
        </div>
      </div>
      <div class="flex align-items-center justify-content-end gap-2 border-top-1 pt-4">
        <button @click="requestEditTodo(todo._id, {title: todo.title, content: todo.content})">Modifica</button>
        <button @click="deleteTodo(todo._id)">Elimina</button>
      </div>
    </div>
  </div>

</template>