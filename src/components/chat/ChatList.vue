<template>
  <q-list separator>
    <q-item
      v-for="(chat, index) in chats"
      :key="index"
      class="q-mb-sm"
      clickable
      v-ripple
    >
      <q-item-section avatar>
        <q-avatar>
          <img
            :src="getUserPhoto(chat)"
            style="object-fit: cover"
            alt="tour app"
          />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ getUserName(chat) }}</q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-icon name="chat_bubble" color="grey" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup lang="ts">
import ChatDTO from 'src/dto/chat/ChatDTO';
import UserTemplate from 'assets/icons/user_template.png';
import { useAccountStore } from 'stores/account-store';

defineOptions({
  name: 'ChatList',
});

interface Props {
  chats: Array<ChatDTO>;
}

const props = defineProps<Props>();

const accountStore = useAccountStore();

// Methods
const getOtherUser = (chat: ChatDTO) => {
  if (accountStore.isGuide) return chat.turista;
  return chat.guia;
};

const getUserPhoto = (chat: ChatDTO) => {
  return getOtherUser(chat).foto ? getOtherUser(chat).foto : UserTemplate;
};

const getUserName = (chat: ChatDTO) => {
  return getOtherUser(chat).nombre + ' ' + getOtherUser(chat).apellido;
};
</script>

<style scoped lang="scss"></style>
