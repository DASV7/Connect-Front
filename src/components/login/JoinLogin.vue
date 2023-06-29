<template>
  <div class="loginConnect">
    <div v-if="showPoliticis" class="politicsModal">
      <div class="politicsModal__container">
        <p>Aviso legal:</p>

        <p>
          Términos y Condiciones de Uso de la Aplicación de Citas con Funcionalidad de Video Llamadas Aleatorias y Mensajería, y Subida de Fotos de Perfil. Estos Términos y
          Condiciones ("Términos") establecen los derechos y obligaciones legales entre usted ("Usuario" o "Usted") y Vinc ("Empresa", "Nosotros" o "Nuestro") en relación con el
          uso de la aplicación de citas con funcionalidad de video llamadas aleatorias y mensajería, así como la subida de fotos de perfil, y la obtención de permisos para acceder
          a la cámara, el micrófono y la ubicación ("Aplicación").
        </p>

        <p>Al utilizar la Aplicación, Usted acepta cumplir y estar sujeto a estos Términos. Si no está de acuerdo con estos Términos, no utilice la Aplicación.</p>

        <p>1. Uso de la Aplicación</p>
        <p>
          1.1 Aceptación de los Términos: Al utilizar la Aplicación, Usted declara ser mayor de edad y tener capacidad legal para celebrar un contrato vinculante en su
          jurisdicción. Si Usted es menor de edad, debe obtener el consentimiento de sus padres o tutores legales para utilizar la Aplicación. Además, Usted acepta que su uso de la
          Aplicación estará sujeto a cualquier versión actualizada de estos Términos que se publique en la Aplicación.
        </p>
        <p>
          1.2 Uso Autorizado: Usted se compromete a utilizar la Aplicación únicamente de acuerdo con estos Términos y de manera consistente con todas las leyes y regulaciones
          aplicables. Usted se compromete a no utilizar la Aplicación con fines ilegales o no autorizados, y acepta no violar ninguna ley en relación con su uso de la Aplicación.
        </p>
        <p>
          1.3 Cuentas de Usuario: Al registrarse para obtener una cuenta en la Aplicación, Usted se compromete a proporcionar información precisa y actualizada. Usted es
          responsable de mantener la confidencialidad de su cuenta y contraseña, y acepta notificarnos inmediatamente cualquier uso no autorizado de su cuenta.
        </p>

        <p>2. Privacidad y Protección de Datos</p>
        <p>
          2.1 Política de Privacidad: Valoramos su privacidad y nos comprometemos a proteger la información personal que recopilamos a través de la Aplicación. Nuestra Política de
          Privacidad establece cómo recopilamos, utilizamos y protegemos su información personal. Le recomendamos leer nuestra Política de Privacidad, que forma parte integral de
          estos Términos.
        </p>
        <p>
          2.2 Consentimiento para el Procesamiento de Datos: Al utilizar la Aplicación, Usted otorga su consentimiento expreso para que recopilemos, almacenemos, procesemos y
          utilicemos su información personal de acuerdo con nuestra Política de Privacidad y las leyes y regulaciones aplicables.
        </p>
        <p>
          2.3 Seguridad de los Datos: Nos comprometemos a implementar medidas de seguridad razonables para proteger su información personal. Sin embargo, Usted reconoce y acepta
          que ninguna medida de seguridad es absolutamente infalible, y que no podemos garantizar la seguridad completa de su información personal.
        </p>

        <p>3. Contenido del Usuario</p>
        <p>
          3.1 Propiedad del Contenido: Usted retiene la propiedad de cualquier contenido, como texto, fotos, videos u otros materiales ("Contenido del Usuario"), que suba, publique
          o comparta a través de la Aplicación.
        </p>
        <p>
          3.2 Licencia de Uso: Al subir, publicar o compartir Contenido del Usuario a través de la Aplicación, Usted otorga a Vinc una licencia no exclusiva, transferible,
          sublicenciable, mundial y libre de regalías para utilizar, reproducir, modificar, adaptar, distribuir y mostrar públicamente dicho Contenido del Usuario en relación con
          la prestación de los servicios de la Aplicación. Esta licencia tiene como finalidad permitirnos operar, mejorar y promocionar la Aplicación.
        </p>
        <p>
          3.3 Responsabilidad del Contenido: Usted declara y garantiza que tiene todos los derechos necesarios para otorgar la licencia mencionada en la cláusula 3.2 y que el
          Contenido del Usuario no viola los derechos de terceros ni ninguna ley aplicable. Usted será el único responsable del Contenido del Usuario que suba, publique o comparta
          a través de la Aplicación.
        </p>
        <p>
          3.4 Moderación del Contenido: Nos reservamos el derecho, pero no tenemos la obligación, de supervisar, revisar, eliminar o modificar cualquier Contenido del Usuario que
          considere, a nuestra entera discreción, que viola estos Términos o es inapropiado, ofensivo o ilegal.
        </p>

        <p>4. Propiedad Intelectual</p>
        <p>
          4.1 Derechos de Autor: La Aplicación, incluyendo su diseño, gráficos, logotipos, nombres comerciales, iconos, textos y otras características, así como los materiales y
          contenidos proporcionados a través de la Aplicación, están protegidos por derechos de autor y otras leyes de propiedad intelectual.
        </p>
        <p>
          4.2 Marcas Comerciales: Todas las marcas comerciales, logotipos y nombres comerciales utilizados en la Aplicación son propiedad de sus respectivos propietarios y están
          protegidos por las leyes de marcas comerciales aplicables. Ningún aspecto de estos Términos o el uso de la Aplicación otorga a Usted ningún derecho o licencia para
          utilizar ninguna marca comercial sin el consentimiento previo por escrito del propietario correspondiente.
        </p>
        <p>
          4.3 Restricciones de Uso: Usted se compromete a no copiar, modificar, distribuir, transmitir, mostrar, realizar, reproducir, publicar, licenciar, crear trabajos
          derivados, transferir o vender ninguna información, software, productos o servicios obtenidos de o a través de la Aplicación, excepto en la medida expresamente permitida
          por estos Términos.
        </p>
        <p>
          4.4 Notificación y Retiro: Si Usted cree que algún contenido disponible a través de la Aplicación infringe sus derechos de autor u otros derechos de propiedad
          intelectual, por favor notifíquenos mediante la información de contacto proporcionada al final de estos Términos.
        </p>

        <p>5. Limitación de Responsabilidad</p>
        <p>
          5.1 Exclusión de Garantías: Usted comprende y acepta que el uso de la Aplicación se realiza bajo su propio riesgo. La Aplicación se proporciona "tal cual" y "según
          disponibilidad", sin garantías de ningún tipo, ya sean expresas o implícitas, incluyendo, pero no limitándose a, garantías de comerciabilidad, idoneidad para un fin
          particular y no infracción.
        </p>
        <p>
          5.2 Limitación de Responsabilidad: En la medida máxima permitida por la ley aplicable, bajo ninguna circunstancia Vinc, sus directores, empleados, afiliados o agentes
          serán responsables ante Usted por ningún daño directo, indirecto, incidental, especial, consecuencial o punitivo, incluyendo, pero no limitándose a, pérdida de
          beneficios, pérdida de datos, interrupción del negocio o daños a la reputación, que surjan de o estén relacionados con el uso o la imposibilidad de uso de la Aplicación.
        </p>

        <p>6. Ley Aplicable y Jurisdicción</p>
        <p>6.1 Ley Aplicable: Estos Términos se regirán e interpretarán de acuerdo con las leyes del [País], sin tener en cuenta sus principios de conflicto de leyes.</p>
        <p>6.2 Jurisdicción Exclusiva: Cualquier disputa que surja de estos Términos se someterá a la jurisdicción exclusiva de los tribunales competentes del [País].</p>

        <p>Derechos de Autor Vinc.inc</p>
      </div>
      <button @click="politics(false)" class="politicsModal__container-btn">Cerrar</button>
    </div>

    <div class="loginConnect__containerTitle">
      <img class="loginConnect__title" src="../../../public/svgLogoComplete.svg" alt="" />
    </div>

    <totalLoading v-if="isLoading" />

    <div class="joinConnect">
      <h3 class="joinConnect__greeting">! Hola de regreso ¡</h3>
      <p class="joinConnect__greeting-p">Ingresa tu correo o numero de telefono</p>
    </div>
    <div class="joinConnect__formJoin">
      <div class="joinConnect__formJoin-container">
        <input class="joinConnect__formJoin-input" type="email" placeholder="Correo o numero de celular" v-model="userData.email" />
      </div>
      <div class="joinConnect__formJoin-container">
        <input class="joinConnect__formJoin-input" type="password" placeholder="Contraseña" v-model="userData.password" @keypress.enter="loginUser()" />
      </div>
      <div class="joinConnect__formJoin-btn" @click="loginUser()">
        <button class="joinConnect__formJoin-btnSend">Entrar</button>
      </div>
    </div>
    <div class="joinConnect__types">
      <p class="joinConnect__types-p">¿Olvidaste tu Contraseña?</p>
    </div>
    <div class="joinConnect__joinS">
      <div class="loginConnect__join-info">
        <a class="loginConnect__join-link" @click="$router.push('/')">Continuar de otra forma</a>
      </div>
      <div class="loginConnect__join-private">
        <p class="loginConnect__join-text">
          Al crear una cuenta aceptas nuestros
          <i class="politics" @click="politics(true)">Terminos y condiciones y nuestra Políticas de privacidad</i>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "../../api/axios";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import Swal from "sweetalert2";
const router = useRouter();
import totalLoading from "../shared/totalLoading.vue";
import { usePush } from "notivue";

let userData = ref({
  email: "",
  password: "",
});

onMounted(() => {
  localStorage.clear();
});

const isLoading = ref(false);

const push = usePush();

const loginUser = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  const user = await axios.post("/usersmodule/login", userData.value).catch((error) => {
    push.error({
      title: "Ocurrio un error",
      message: "Correo o contraseña incorrectos",
    });
  });
  isLoading.value = false;
  if (user.data.data.data) {
    push.success({
      title: "Inicio de sesion Correcto.",
      message: "Bienvenido nuevamente.",
    });
    localStorage.setItem("vinc-jwt", user.data.data.data);
    router.push("/home");
  }
};
let showPoliticis = ref(false);

function politics(item) {
  showPoliticis.value = item;
}
</script>

<style lang="scss">
* {
  font-family: sans-serif;
}
.joinConnect {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
  &__greeting {
    text-align: center;
    font-size: 20px;
    margin: 0%;
    &-p {
      color: #a69a9a;
      font-size: 13px;
      font-weight: 600;
    }
  }
  &__formJoin {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 65%;

    @include dynamicScreen(650px) {
      width: 40%;
    }
    height: 25%;

    &-container {
      width: 100%;
      border-bottom: 2px solid #d4d3d3;
    }
    &-input {
      text-align: center;
      width: 98%;
      height: 40px;
      outline: none;
      border: none;
      background-color: #f9f9f9;
      color: #000;
      font-weight: 700;
    }
    &-btn {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top: 15px;
    }
    &-btnSend {
      width: 80%;
      height: 45px;
      border: none;
      background-color: $primary-color;
      color: #fff;
      border-radius: 30px;
      font-weight: 700;
      cursor: pointer;
    }
  }
  &__types {
    margin-top: 10px;
    text-align: center;

    &-p {
      font-size: 13px;
      color: $primary-color;
      font-weight: 700;
      cursor: pointer;
    }
  }

  &__joinS {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 32%;
  }
}
.politicsModal {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: #000000a6;
  position: absolute;
  z-index: 10;

  &__container {
    width: 85%;
    height: 75%;
    background-color: #ffffff;
    padding: 15px;
    overflow-y: scroll;
    border-radius: 30px;

    &-txt {
      color: #000000;
      text-align: start;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
      font-weight: 500;
    }
    &-btn {
      width: 90%;
      height: 30px;
      margin-top: 10px;
      border: none;
      border-radius: 30px;
      background-color: $primary-color;
      color: #fff;
      font-weight: 700;
    }
  }
}
.politics {
  color: $primary-color;
  text-decoration-line: underline;
}
</style>
