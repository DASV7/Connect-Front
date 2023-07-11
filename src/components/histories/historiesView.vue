<script setup>
import { ref, onMounted } from "vue";
import CardUser from "./cardUserHistories.vue";
import modalBottom from "../shared/modalBottom.vue";
import { useCounterStore } from "../../store/users";
import historiesCard from "./historiesCard.vue";
import axios from "../../api/axios";
import viewHistoriesModal from "./viewHistoriesModal.vue";

const showModal = ref(false);
const userStore = useCounterStore();
const usersCard = ref([]);
const selectedFile = ref();
const emojiSelect = ref();
const emojis = ["😊 Alegre", "😭 triste", "🥶 Con frio", "🌞 Con Calor", "🥺 Preguntame ", "🤭  No lo dire", "😴 Tengo sueño", "🥴 Con hambre", "💪 Modo Gim"];
const description = ref("");
const selectEmoji = (index) => {
  emojiSelect.value = emojis[index];
};
const changeStatusModal = () => {
  showModal.value = !showModal.value;
};

const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    const previewImage = document.getElementById("imageHistories");

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      previewImage.src = event.target.result;
    });

    reader.readAsDataURL(file);
  }
};

const sendHistory = async () => {
  let formData = new FormData();
  formData.append("description", description.value);
  formData.append("histories", selectedFile.value);
  formData.append("status", emojiSelect.value);
  const data = await axios
    .post("/histories/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .catch((error) => {
      isCreatingUser.value = false;
      Swal.fire({
        icon: "error",
        title: "Ocurrio un error",
        text: "No se ha subido Tu historia",
        showConfirmButton: false,
        timer: 2000,
      });
    });
  token = data;
};

onMounted(() => {
  usersCard.value = [userStore.user, userStore.user, userStore.user, userStore.user, userStore.user, userStore.user];
});

let showViewHistories = ref(false);
const changesStatus = () => {
  showViewHistories.value = !showViewHistories.value;
};
// function closeOnClick() {
//   showViewHistories.value = false;
// }
const openModal = (user) => {
  showViewHistories.value = true;
};
</script>
<template>
  <section class="historiesView">
    <viewHistoriesModal :showModal="showViewHistories" @closeModal="changesStatus()"></viewHistoriesModal>
    <div class="historiesView__tittle">
      <img class="historiesView__img" src="../../../public/svgLogoComplete.svg" alt="" srcset="" />
      <div><p>Cuentas que Sigues</p></div>
    </div>
    <div class="historiesView__wrapper">
      <div class="historiesView__header">
        <div class="historiesView__header-fix" @click="changeStatusModal()">
          <i class="fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div class="historiesView__header-column" scrollDefault>
          <div class="historiesView__header-item slideInDown" scrollDefault v-if="usersCard.length">
            <CardUser v-for="(user, index) in usersCard" :key="index" :user="user"></CardUser>
          </div>
        </div>
      </div>
      <div class="historiesView__search"></div>
    </div>
    <modalBottom :showModal="showModal" @changeModal="changeStatusModal()">
      <template v-slot:content>
        <div>
          <div class="creationHistories">
            <div class="creationHistories__multimedia">
              <p>¡Sube una imagen y comparte cómo te sientes con el mundo!</p>
              <label class="creationHistories__multimedia-label" for="multimedia"
                ><i class="fa fa-plus" aria-hidden="true" v-if="!selectedFile"></i>
                <img id="imageHistories" src="#" alt="Previsualizacion Imagen" v-show="selectedFile" />
              </label>
              <input @change="handleFileUpload($event)" v-show="false" type="file" id="multimedia" multiple="false" />

              <label for="description"> Agrega una breve descripcion :</label>
              <u class="creationHistories__litte">No se pemiten mensajes ofensivos o inapropiados</u>
              <input class="creationHistories__input" name="description" placeholder="Descripción" v-model="description" type="text" id="description" />
            </div>
            <div class="creationHistories__status">
              <label for="description"> Estado de animo :</label>
              <div class="creationHistories__status-item" scrollDefault>
                <span @click="selectEmoji(index)" v-for="(item, index) in emojis" :key="index" :class="emojiSelect == item ? 'creationHistories__status-active' : ''">{{
                  item
                }}</span>
              </div>
            </div>
            <button class="creationHistories__button" @click="sendHistory($event)" :disabled="!selectedFile || !emojiSelect || !description">Guardar</button>
          </div>
        </div>
      </template>
    </modalBottom>

    <!-- Card Video -->
    <div class="historiesView__component">
      <historiesCard @changeModal="openModal($event)"></historiesCard>
    </div>
  </section>
</template>
<style lang="scss">
.historiesView {
  width: 100%;
  height: 100%;
  &__tittle {
    @include Column;
    margin-bottom: 10px;
  }
  &__wrapper {
    display: flex;
    // padding-left: 10px;
    flex-direction: column;
    align-items: center;
    width: 100%;
    // height: 100%;
  }

  &__img {
    width: 98px;
    height: 25px;
    margin-top: 5px;
  }
  &__header {
    display: flex;
    gap: 5px;
    width: 65%;
    background-color: #009eff47;
    border-radius: 10px;
    padding: 5px;

    &-column {
      display: flex;
      flex-direction: column;
      margin-left: 60px;
      overflow-x: auto;
    }

    &-fix {
      display: flex;
      align-items: center;
      justify-content: center;
      // position: fixed;
      border-radius: 50%;
      border: 10px;
      width: 50px;
      height: 50px;
      border: 1px solid #000;
      font-size: 50px;
      margin-top: 2px;
      cursor: pointer;
    }
    &-item {
      width: 100%;
      display: flex;
      gap: 10px;
      padding: 2px;
    }
  }
  &__component {
    width: 100%;
    display: flex;
    justify-content: center;
  }
}

.creationHistories {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;

  &__multimedia {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &-label {
      width: 50px;
      height: 50px;
      border-radius: 10px;
      border: 1px solid #000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      cursor: pointer;
    }
  }
  &__button {
    display: flex;
    justify-content: center;
    background-color: $primary-color;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
    border: none;
    color: white;
    height: 20px;
    margin-top: 10px;
  }
  &__litte {
    font-size: 10px;
    margin-top: -10px;
  }
  &__input {
    border: 1px solid $primary-color;
    border-radius: 10px;
    height: 20px;
    padding: 5px;
    outline: none;
  }
  &__status {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    &-item {
      display: flex;
      flex-wrap: wrap;
      overflow-x: auto;
      overflow-y: hidden;
      gap: 10px;
      span {
        border: 1px solid $primary-color;
        padding: 5px;
        margin-top: 5px;
        width: 120px;
        height: 20px;
        border-radius: 10px;
        cursor: pointer;
        gap: 10px;
        display: flex;
        flex-wrap: nowrap;
      }
    }
    &-active {
      background-color: $primary-color;
    }
  }
}
#imageHistories {
  width: 49px;
  height: 49px;
  border-radius: 10px;
}
</style>
