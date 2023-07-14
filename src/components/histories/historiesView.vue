<script setup>
import { ref, onMounted } from "vue";
import { useCounterStore } from "../../store/users";
import CardUser from "./cardUserHistories.vue";
import axios from "../../api/axios";
import modalBottom from "../shared/modalBottom.vue";
import historiesCard from "./historiesCard.vue";
import historiesModalView from "./histories.modal.View.vue";

const showModal = ref(false);
const userStore = useCounterStore();
const usersCard = ref([]);
const selectedFile = ref();
const emojiSelect = ref();
const emojis = ["😊 Alegre", "😭 triste", "🥶 Con frio", "🥵 Con Calor", "🥺 Preguntame ", "🤭 No lo diré", "😴 Tengo sueño", "🥴 Con hambre", "💪 Modo Gym", "🔥 12 + 1"];
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
const isLoading = ref(true);
const sendHistory = async () => {
  let formData = new FormData();
  formData.append("description", description.value);
  formData.append("histories", selectedFile.value);
  formData.append("status", emojiSelect.value);
  try {
    const data = await axios.post("/histories/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // Haz algo con los datos devueltos si es necesario
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Ocurrió un error",
      text: "No se ha subido tu historia",
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

const showViewHistories = ref(false);
const changesStatus = () => {
  showViewHistories.value = !showViewHistories.value;
};
const userModal = ref(null)

const openModal = (user) => {  
  userModal.value = user;
  showViewHistories.value = !showViewHistories.value;
  console.log(userModal.value);

};
const userAndhistories = ref([]);
const historiesInfo = ref([]);

onMounted(async () => {
  usersCard.value = [userStore.user, userStore.user, userStore.user, userStore.user, userStore.user, userStore.user];

  try {
    const response = await axios.get("/returnHistories");
    userAndhistories.value = response.data;
    // console.log(userAndhistories.value);
    historiesInfo.value = userAndhistories.value[0].histories;
    isLoading.value = false;
  } catch (error) {
    isLoading.value = false;
    // Manejo de error
  }
});
</script>

<template>
  <section class="historiesView">
    <div class="historiesView__container">
      <!--  Open Histories  -->

      <historiesModalView v-if="showViewHistories" :user="userModal" :showModal="showViewHistories" @closeModal="changesStatus()"></historiesModalView>

      <!-- tittle  -->

      <div class="historiesView__tittle">
        <img class="historiesView__img" src="../../../public/svgLogoComplete.svg" alt="" srcset="" />
        <div><p>Cuentas que Sigues</p></div>
      </div>

      <!-- list of Histories  -->

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

      <!-- Modal UpLOad Histories  -->
      
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

      <div class="historiesView__component" v-if="!isLoading">
        <historiesCard v-for="(item, index) in userAndhistories" :key="index" :user="item"  @changeModal="openModal($event)"></historiesCard>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.historiesView {
  width: 100%;
  height: 100%;

  &__container {
    width: 100%;
    height: 100%;
  }

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
    width: 97%;
    min-width: 300px;

    &-column {
      display: flex;
      flex-direction: column;
      // margin-left: 60px;
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
    flex-wrap: wrap;
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
    align-items: center;
    background-color: $primary-color;
    text-align: center;
    border-radius: 10px;
    font-weight: bold;
    border: none;
    color: white;
    height: 35px;
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
    margin-top: 10px;

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
  object-fit: cover;
}

@media screen and (min-width: 1024px) {
  .historiesView {
    display: flex;
    &__container {
      width: 55%;
      height: 95%;
      // box-shadow: 0px 5px 15px #9e9c9c8d;
      box-shadow: #000 0px 5px 10px;
      margin: auto;
      border-radius: 20px;
    }
  }
}
</style>
