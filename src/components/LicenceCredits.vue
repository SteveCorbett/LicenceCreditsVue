<template>
  <div class="self">
    <h1>Some Heading Goes Here</h1>
    This application uses one or more of the following packages:
    <div class="panels">
      <div
        v-for="(item, ix) in licences"
        class="licencePanel"
        :key="'lic-' + ix"
      >
        <div class="spaceAfter">
          Package{{ item.packages.length > 1 ? "s" : "" }}:
          {{ item.packages.join(", ") }}
        </div>
        <div class="spaceAfter" style="display: flex">
          <span style="min-width: 15rem; margin-right: 1rem"
            >Publisher: {{ item.publisher }}</span
          >
          <span>Licence: {{ item.type }}</span>
        </div>
        <div
          v-if="item.licence != ''"
          style="white-space: pre-wrap"
          class="spaceAfter"
        >
          {{ item.licence }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.self {
  display: flex;
  flex-direction: column;
  max-height: 100%;
}
.licencePanel {
  margin: 0.5rem auto;
  padding: 1rem;
  flex-grow: 1;
  border-radius: 6px;
  border: 1px solid white;
}

.panels {
  overflow-y: scroll;
  padding-right: 6px;
  margin-top: 0.8rem;
}

.spaceAfter {
  margin-bottom: 0.5rem;
}
</style>

<script lang="ts">
interface ILicence {
  packages: string[];
  type: string;
  publisher: string;
  licence: string;
}
interface ILicences {
  licences: ILicence[];
}
export default {
  name: "licenceCredits",
};
</script>

<script setup lang="ts">
import { ref } from "vue";

let licences = ref<ILicence[]>([]);
fetch("/licences.json", {
  headers: {
    "content-type": "application/json",
  },
})
  .then((response) => {
    return response.json();
  })
  .then((response: ILicences) => {
    for (let ix = 0; ix < response.licences.length; ix++) {
      licences.value.push(response.licences[ix]);
    }
  })
  .catch((err) => {
    console.error("Error!: ", err);
  });
</script>
