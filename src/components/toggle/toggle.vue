<script setup>
import { ref, defineProps, onMounted, onBeforeMount } from "vue";

const isActive = ref(false);

const props = defineProps(["isActive"]);
const emits = defineEmits(["toogle"])

const toggleSwitch = () => {
  isActive.value = !isActive.value;  
  emits("toogle",  isActive.value)
};

onBeforeMount(()=>{  
    isActive.value = props.isActive      
})
</script>

<template>
  <label class="switch">
    <input type="checkbox" v-model="isActive" @input="toggleSwitch" />
    <span class="slider" :class="{ active: isActive }"></span>
  </label>
</template>


<style>
/* Estilos del interruptor */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
}

/* Estilos del checkbox oculto */
.switch input {
  display: none;
}

/* Estilos del slider (círculo) */
.slider {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 10px;
  background-color: gray;
  cursor: pointer;
  transition: background-color 0.2s;
}

/* Estilos del slider cuando el interruptor está activado */
.switch input:checked + .slider {
  background-color: #2196f3;
}

/* Estilos del círculo (slider) */
.slider:before {
  content: "";
  position: absolute;
  height: 16px;
  width: 16px;
  top: 2px;
  left: 2px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

.active:before {
  transform: translateX(19px);
}
</style>
