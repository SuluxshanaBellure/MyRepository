<template>
  <div id="chat-app">
    <div id="chat-icon" @click="toggleChat"><i class="fas fa-comments"></i></div>
    <div id="chat" v-if="chatVisible">
      <div id="chat-header">
        <img src="/images/robot_image.jpg" style="height: 50px; width: 50px;" />
        <h2 class="botName">{{ botName }}</h2>
        <button @click="toggleChat" id="close-btn">&times;</button>
      </div>
      <ul id="chat-messages" ref="chatMessages">
        <li v-for="(msg, index) in messages" :key="index" :class="getMessageClass(msg)">
          <div v-html="formatMessageContent(msg.content, msg.expanded)" @click="msg.expanded = !msg.expanded"></div>
          <div class="message-timestamp">{{ msg.timestamp }}</div>
        </li>
      </ul>
      <div id="chat-input">
        <input type="text" v-model="message" @keyup.enter="handleUserInput" />
        <button @click="handleUserInput" :disabled="!message.trim()"><i class="fas fa-paper-plane"></i></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      message: "",
      appId: "C98D8EAA-EB0C-49D3-96CF-A4DF6DA2B189",
      botId: "onboarding_bot",
      botApiToken: "b379b55e1a97e90de715903280e03b52e1008aaf",
      userId: "suluxshana_2001",
      channelUrl: "sendbird_group_channel_422625632_ae7d8a9d4c14971d3675122a53105bf99b7eda1c",
      messages: [],
      chatVisible: false,
      botName: "Bot",
      welcomeMessage: "Welcome! How can I assist you today?",
      BASE_URL: "",
      isSending: false, 
    };
  },
  methods: {
    toggleChat() {
      this.chatVisible = !this.chatVisible;
      this.scrollChatToBottom();
    },
    handleUserInput() {
      if (!this.isSending) {
        this.sendMessage();
      }
    },
    async sendMessage() {
      try {
        this.isSending = true; 
        await this.createOrGetChannel();
        await this.addParticipant(this.botId);

        const SEND_MESSAGE_URL = `${this.BASE_URL}/messages`;

        const messagePayload = {
          message_type: "MESG",
          user_id: this.userId,
          message: this.message,
        };

        const headers = {
          "Api-Token": this.botApiToken,
          "Content-Type": "application/json",
        };

        const response = await axios.post(SEND_MESSAGE_URL, messagePayload, { headers });

        const messageId = response.data.message_id;

        if (messageId) {
          this.messages.push({ content: this.message, sender: "user", expanded: false });
          this.message = "";
          this.scrollChatToBottom();
          await this.waitForBotResponse(messageId);
          this.scrollChatToBottom();
        } else {
          throw new Error("Failed to retrieve message_id of the sent message.");
        }
      } catch (error) {
        console.error("Error sending message:", error);
        this.error = true;
        this.errorMessage = error.response ? error.response.data.message : "Failed to send message.";
      } finally {
        this.isSending = false; 
      }
    },
    async createOrGetChannel() {
      return Promise.resolve(this.channelUrl);
    },
    async addParticipant(botId) {
      const ADD_PARTICIPANT_URL = `${this.BASE_URL}/invite`;

      const payload = {
        user_ids: [botId],
      };

      const headers = {
        "Api-Token": this.botApiToken,
        "Content-Type": "application/json",
      };

      await axios.post(ADD_PARTICIPANT_URL, payload, { headers });
    },
    async waitForBotResponse(messageId) {
      const FETCH_MESSAGES_URL = `${this.BASE_URL}/messages`;

      const headers = {
        "Api-Token": this.botApiToken,
        "Content-Type": "application/json",
      };

      try {
        let botResponse = null;
        const startTime = Date.now();
        const timeout = 10000;

        while (!botResponse && Date.now() - startTime < timeout) {
          const response = await axios.get(FETCH_MESSAGES_URL, {
            params: {
              message_id: messageId,
              // next_limit: 10,
              reverse: false,
            },
            headers,
          });

          botResponse = response.data.messages.find(
            (msg) => msg.user.user_id === this.botId && msg.data && JSON.parse(msg.data).respond_mesg_id === messageId
          );

          if (!botResponse) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
          }
        }

        if (botResponse) {
          const botMessage = {
            content: botResponse.message,
            sender: "bot",
            expanded: false,
            botName: this.botName,
          };
          this.messages.push(botMessage);
        } else {
          console.error("Bot response not found or timeout reached.");
          this.error = true;
          this.errorMessage = "Bot response not found or timeout reached.";
        }
      } catch (error) {
        console.error("Error fetching bot response:", error);
        this.error = true;
        this.errorMessage = error.response ? error.response.data.message : "Failed to fetch bot response.";
      }
    },
    async fetchBotName() {
      const BOT_NAME_URL = `https://api-${this.appId}.sendbird.com/v3/bots/${this.botId}`;

      const headers = {
        "Api-Token": this.botApiToken,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(BOT_NAME_URL, { headers });
        this.botName = response.data.bot.bot_nickname || "Bot";
      } catch (error) {
        console.error("Error fetching bot name:", error);
        this.botName = "Bot";
      }
    },
    getMessageClass(msg) {
      if (msg.sender === "user") {
        return "user-message";
      } else if (msg.sender === "bot") {
        if (msg.content === this.welcomeMessage) {
          return "bot-welcome-message";
        } else {
          const lines = msg.content.split("\n");
          const hasBulletPoints = lines.some(
            (line) =>
              line.trim().startsWith("- ") || line.trim().startsWith("* ")
          );

          if (hasBulletPoints) {
            return "bot-message-bullets";
          } else {
            return "bot-message";
          }
        }
      } else {
        return "bot-message";
      }
    },
    formatMessageContent(content, expanded) {
      if (expanded || content.length <= 300) {
        return content.replace(/\n/g, "<br>");
      } else {
        return content.slice(0, 300).replace(/\n/g, "<br>") + '... <span style="color: red;cursor: pointer;">Read more</span>';
      }
    },
    scrollChatToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },
  },
  async created() {
    await this.createOrGetChannel();
    await this.fetchBotName();
    this.messages.push({
      content: this.welcomeMessage,
      sender: "bot",
      expanded: false,
    });
    this.BASE_URL = `https://api-${this.appId}.sendbird.com/v3/group_channels/${this.channelUrl}`;
  }
};
</script>

<style scoped>
#chat-app {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

#chat-icon {
  background-color: #007bff;
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  text-align: center;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  z-index: 999;
}

#chat {
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  width: 400px;
  height: 500px;
  overflow-y: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 70px;
  right: 20px;
  z-index: 998;
}

#chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: #f7f7f7;
}

#close-btn {
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

#chat-messages {
  flex: 1;
  list-style-type: none;
  padding: 10px;
  margin: 0;
  overflow-y: auto;
}

#chat-input {
  display: flex;
  border-top: 1px solid #ccc;
}

#chat-input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 0;
  outline: none;
}

#chat-input button {
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  outline: none;
}

#chat-input button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}

.botName {
  font-family: "Lucida Console", "Courier New", monospace;
  font-size: 18px;
  padding-right: 165px;
  font-weight: bold;
}

.user-message {
  background-color: #f0f0f0;
  color: black;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 15px;
  display: inline-block;
  float: right;
}

.bot-message, .bot-message-bullets, .bot-welcome-message {
  background-color: #007bff;
  color: white;
  padding: 8px;
  border-radius: 5px;
  margin-bottom: 10px;
  white-space: pre-line;
}

.bot-message {
  margin-top: 60px;
}

.bot-message-bullets {
  margin-top: 10px;
}

.bot-welcome-message {
  margin-top: 0px;
}

.read-more {
  cursor: pointer;
  color: red;
}
</style>
