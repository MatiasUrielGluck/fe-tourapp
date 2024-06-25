<template>
  <q-page>
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; margin-bottom: 100px">
        <q-chat-message
          v-for="(message, index) in mappedMessages"
          :key="index"
          :name="message.emisorNombre"
          :text="[message.contenido]"
          :sent="message.sent"
        />
        <p ref="lastMsgScroll"></p>
      </div>
      <div class="msg-txt">
        <q-input
          filled
          v-model="newMsg"
          label="Mensaje"
          @keydown.enter="sendMsg"
        >
          <template v-slot:append>
            <q-btn icon="send" dense flat @click="sendMsg" />
          </template>
        </q-input>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useAppStore } from 'stores/app-store';
import { getMessagesByChat, sendMessage } from 'src/services/chat.service';
import MessageResponseDTO from 'src/dto/chat/MessageResponseDTO';
import { useRoute } from 'vue-router';
import MessageUI from 'src/types/MessageUI';
import { useAccountStore } from 'stores/account-store';
import MessageRequestDTO from 'src/dto/chat/MessageRequestDTO';

defineOptions({
  name: 'IndividualChatPage',
});

const route = useRoute();

// Store
const appStore = useAppStore();
const accountStore = useAccountStore();

// Ref
const messages = ref<Array<MessageResponseDTO>>();
const newMsg = ref<string>('');
const lastMsgScroll = ref<HTMLParagraphElement | null>(null);

const mappedMessages = computed<Array<MessageUI>>(() => {
  if (!messages.value) return [];
  return messages.value.map(function (message): MessageUI {
    return {
      emisorNombre: message.emisorNombre,
      contenido: message.contenido,
      sent: accountStore.id === message.emisorId,
    };
  });
});

// Method
const fetchMessages = async () => {
  try {
    appStore.showPreloader();
    const chatId = Number(route.params.id);
    messages.value = await getMessagesByChat(chatId);
  } catch (e) {
    console.error(e);
  }
  appStore.hidePreloader();
};

const sendMsg = async () => {
  try {
    const chatId = Number(route.params.id);
    const data: MessageRequestDTO = {
      chatId: chatId,
      contenido: newMsg.value,
    };
    const newMsgResponse = await sendMessage(data);
    messages.value?.push(newMsgResponse);
    newMsg.value = '';
  } catch (e) {
    console.error(e);
  }
};

// Cycle
onMounted(async () => {
  await fetchMessages();
  lastMsgScroll.value?.scrollIntoView({ behavior: 'smooth' });
});
</script>

<style scoped lang="scss">
.msg-txt {
  position: fixed;
  bottom: 0;
  padding: 24px;
  width: 100%;
  z-index: 100;
  background: $light;
}
</style>
