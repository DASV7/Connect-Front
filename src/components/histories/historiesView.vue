<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useCounterStore } from "../../store/users";
import CardUser from "./cardUserHistories.vue";
import axios from "../../api/axios";
import modalBottom from "../shared/modalBottom.vue";
import historiesCard from "./historiesCard.vue";
import historiesModalView from "./histories.modal.View.vue";
import totalLoading from "../shared/totalLoading.vue";
import { usePush } from "notivue";

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
const isLoaginHistory = ref(false);
const sendHistory = async () => {
  let formData = new FormData();
  formData.append("description", description.value);
  formData.append("histories", selectedFile.value);
  formData.append("status", emojiSelect.value);
  isLoaginHistory.value = true;
  try {
    const data = await axios.post("/histories/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    isLoaginHistory.value = false;
    showModal.value = false;
    // Haz algo con los datos devueltos si es necesario
  } catch (error) {
    isLoaginHistory.value = false;
    showModal.value = false;
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
const userModal = ref(null);

let isFollowed = ref();

const openModal = (user, Followed = false) => {
  userModal.value = user;
  showViewHistories.value = !showViewHistories.value;
  isFollowed.value = Followed;
};

const userAndhistories = ref([]);
const historiesInfo = ref([]);
let usersCardHistories = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("/followers/getFollow");
    usersCardHistories.value = response.data;
  } catch (error) {
    console.log("errororrororor", error);
  }

  usersCard.value = [];

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

const userPushArray = async (eventId) => {
  
  const foundHistory = userAndhistories.value.find((history) => history._id == eventId);
  const index = usersCardHistories.value.findIndex((history) => history._id == eventId);
  const foundHistoryIndex = userAndhistories.value.findIndex((history) => history._id == eventId);

  if (index !== -1) {
    usersCardHistories.value.splice(index, 1);
    const response = await axios.delete("/unFollow");
    // console.log(response);
  } else {
    usersCardHistories.value.push(foundHistory);
  }
};

const eventIdToFind = 2;
userPushArray(eventIdToFind);


// aJUSTE DE RESOLUCION
const isGreaterThan1024 = ref(false);
const handleResize = () => {
  isGreaterThan1024.value = window.innerWidth >= 1024;
};
onMounted(() => {
  handleResize();
  window.addEventListener("resize", handleResize);

});
onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

</script>

<template>
  <section class="historiesView"  v-bind:style="{ background: isGreaterThan1024 ? 'none' : '#fff' }">
    <div class="historiesView__container" scrollDefault>
      <!--  Open Histories  -->

      <historiesModalView
        v-if="showViewHistories"
        @userPush="userPushArray($event)"
        :followedUser="isFollowed"
        :user="userModal"
        :showModal="showViewHistories"
        @closeModal="changesStatus()"
      ></historiesModalView>

      <!-- tittle  -->

      <div class="historiesView__tittle">
        <img class="historiesView__img" src="../../../public/svgLogoComplete.svg" />
        <div><p>Descubrir...</p></div>
      </div>

      <!-- list of Histories  -->

      <div class="historiesView__wrapper">
        <div class="historiesView__header">
          <div class="historiesView__header-fix" @click="changeStatusModal()">
            <i class="fa fa-plus-circle" aria-hidden="true"></i>
          </div>

          <div class="historiesView__header-column" scrollDefault>
            <div class="historiesView__header-item " scrollDefault v-if="usersCardHistories.length">
              <CardUser v-for="(user, index) in usersCardHistories" :key="index" :user="user" @click="openModal(user, true)"></CardUser>
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
        <historiesCard v-for="(item, index) in userAndhistories" :key="index" :user="item" @changeModal="openModal($event)"></historiesCard>
      </div>
    </div>
    <totalLoading v-if="isLoaginHistory" :textLabel="'Subiendo historia'"></totalLoading>
  </section>
</template>

<style lang="scss">
.historiesView {
  width: 100%;
  height: 100%;
  overflow-y: hidden;

  &__container {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
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
    background-color: rgb(129 152 170 / 28%);
    border-radius: 10px;
    padding: 5px;
    width: 97%;
    min-width: 300px;
    margin-bottom: 10px;

    &-column {
      display: flex;
      flex-direction: column;
      // margin-left: 60px;
      // overflow-x: auto;
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
    display: flex;
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
      background-color: #fff;
    }
  }
}
@media (max-width: 335px) {
  .historiesCard__multimedia-play,
  .historiesCard__multimedia-card {
    width: 140px;
  }
}
</style>
