<template>
  <div>
    <div id="chat-box" @click="toggleChat">
      <i class="fas fa-comments"></i>
    </div>
    <div id="chat" v-if="showChat">
      <div class="heading">
        <img src="/images/robot_image.jpg" height="35px" width="35px"/>
        <h3>Sendbird Bot</h3>
        <span class="close-button" @click="toggleChat">&times;</span>
      </div>
      <ul ref="chatMessages" class="chat-messages">
        <li
          v-for="msg in messages"
          :key="msg.messageId"
          :class="getMessageClass(msg)"
        >
          {{ msg.message }}
        </li>
      </ul>
      <input
        ref="input"
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Type your question"
      />
    </div>
  </div>
</template>

<script>
import {
  connectUser,
  createOrGetChannel,
  loadMessages,
  sendMessage,
  listenForNewMessages,
} from "../sendbird";

export default {
  data() {
    return {
      userId: "0131666706b27fed3a6ff741eeccff98b5f4df7f",
      botId: "onboarding_bot",
      message: "",
      messages: [],
      channel: null,
      showChat: false,
    };
  },
  created() {
    connectUser(this.userId, (user, error) => {
      if (error) {
        console.error("Connection failed:", error);
        return;
      }
      this.initializeChannel();
    });
  },
  methods: {
    initializeChannel() {
      createOrGetChannel([this.userId, this.botId], (channel, error) => {
        if (error) {
          console.error("Channel creation failed:", error);
          return;
        }
        this.channel = channel;
        this.loadMessages();
        this.listenForNewMessages();
      });
    },
    loadMessages() {
      if (!this.channel) {
        console.error("Channel is not initialized.");
        return;
      }
      loadMessages(this.channel, (messages, error) => {
        if (error) {
          console.error("Message loading failed:", error);
          return;
        }
        this.messages = messages;
        this.scrollToBottom();
      });
    },
    listenForNewMessages() {
      if (!this.channel) {
        console.error("Channel is not initialized.");
        return;
      }
      listenForNewMessages(this.channel, (message) => {
        this.messages.push(message);
        this.scrollToBottom();
      });
    },
    sendMessage() {
      if (!this.channel) {
        console.error("Channel is not initialized.");
        return;
      }
      sendMessage(this.channel, this.message, (msg, error) => {
        if (error) {
          console.error("Message sending failed:", error);
          return;
        }
        this.messages.push(msg);
        this.message = "";
        this.sendBotResponse(msg);
      });
    },
    sendBotResponse(userMessage) {
      const botResponse = `Bot echo: ${userMessage.message}`;
      if (!this.messages.some((msg) => msg.messageId === userMessage.messageId)) {
        sendMessage(this.channel, botResponse, (msg, error) => {
          if (error) {
            console.error("Bot message sending failed:", error);
            return;
          }
          this.messages.push(msg);
          this.scrollToBottom();
        });
      }
    },
    getMessageClass(msg) {
      return msg.sender.userId === this.botId ? "bot-message" : "user-message";
    },
    toggleChat() {
      this.showChat = !this.showChat;
      if (this.showChat) {
        this.$nextTick(() => {
          this.scrollToBottom();
          this.$refs.input.focus();
        });
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatContainer = this.$refs.chatMessages;
        if (chatContainer) {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }
      });
    },
  },
};
</script>

<style scoped>
#chat-box {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 32px;
  cursor: pointer;
  text-align: center;
  width: 45px;
}
#chat {
  position: fixed;
  bottom: 70px;
  right: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 400px;
  max-height: 500px;
  overflow-y: auto;
  padding: 0; /* Remove padding to align borders */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  margin-bottom: 0px;
  padding-bottom: -18px;
  border-radius: 0px 0px 0px 10px;
}
ul {
  list-style-type: none;
  padding: 10px;
  margin: 0; /* Remove margin to align with chat div */
}
li {
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
}
.user-message {
  border: 2px double #d1e7dd;
  border-radius: 25px;
  /* right: 10px; */
  position: relative;
  right: -165px;
  width: 200px;
}
.bot-message {
  background: #f8d7da;
  border-radius: 25px;
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: brown;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  position: fixed;
  width: 381px;
  z-index: 1;
  border-radius: 10px 0px 0px 0px;
}
.heading h3 {
  margin: 0;
  color: white;
  padding-right: 190px;
}
.close-button {
  font-size: 24px;
  cursor: pointer;
  color: white;
}
</style>
