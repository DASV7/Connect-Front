<template>
  <div class="settings">
    <button class="editProfile__top-btn" @click="$router.push('/profile')"><i class="fa-solid fa-arrow-left"></i></button>
    <button class="profileUser__header-btn" @click="closeSesion()">
      <i class="fa fa-sign-out" aria-hidden="true"></i>
    </button>
  </div>
  <p>x</p>
  <p>x</p>
  <p>x</p>
  <p>x</p>
  <p>x</p>
  <p>x</p>
  <p>x</p>
  <button @click="deleteAccount()">Delete Account</button>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "../../api/axios";
const router = useRouter();
const closeSesion = () => {
  localStorage.clear();
  router.push("/");
  window.location.reload();
};
const deleteAccount = async () => {
  const reponse = await axios.delete("/usersModule/deleteAccount")
  console.log(reponse.data)
  localStorage.clear() 
  router.push("/") 
  window.location.reload()

    .catch((error) => {
      push.error({});
    });
}; 

</script> 

<style></style>
