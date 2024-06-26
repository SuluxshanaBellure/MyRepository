// import SendBird from 'sendbird';
// const APP_ID = 'C98D8EAA-EB0C-49D3-96CF-A4DF6DA2B189'; 

// const sb = new SendBird({ appId: APP_ID });

// export const connectUser = (userId, callback) => {
//   sb.connect(userId, (user, error) => {
//     if (error) {
//       console.error('Connection failed:', error);
//       return callback(null, error);
//     }
//     console.log("userId : ",userId);
//     console.log('User connected:', user);
//     callback(user, null);
//   });
// };

// export const createOrGetChannel = (userIds, callback) => {
//   const params = new sb.GroupChannelParams();
//   params.addUserIds(userIds);
//   params.isDistinct = true;

//   sb.GroupChannel.createChannel(params, (channel, error) => {
//     if (error) {
//       const channelListQuery = sb.GroupChannel.createMyGroupChannelListQuery();
//       channelListQuery.userIdsExactFilter = userIds;
//       channelListQuery.limit = 1;
//       channelListQuery.next((channels, queryError) => {
//         if (queryError) {
//           console.error('Channel creation and retrieval failed:', queryError);
//           return callback(null, queryError);
//         }
//         if (channels.length > 0) {
//           callback(channels[0], null); 
//           console.log("channels :",channel);
//         } else {
//           console.error('Channel creation failed and no existing channel found:', error);
//           callback(null, error);
//         }
//       });
//       return;
//     }
//     callback(channel, null);
//   });
// };

// export const loadMessages = (channel, callback) => {
//   const messageListQuery = channel.createPreviousMessageListQuery();
//   messageListQuery.load(30, false, (messageList, error) => {
//     if (error) {
//       console.error('Message loading failed:', error);
//       return callback(null, error);
//     }
//     callback(messageList, null);
//   });
// };

// export const sendMessage = (channel, message, callback) => {
//   if (!message.trim()) return;

//   channel.sendUserMessage(message, (msg, error) => {
//     if (error) {
//       console.error('Message sending failed:', error);
//       return callback(null, error);
//     }
//     callback(msg, null);
//   });
// };

// export const listenForNewMessages = (channel, callback) => {
//   const channelHandler = new sb.ChannelHandler();
//   channelHandler.onMessageReceived = (ch, message) => {
//     if (ch.url === channel.url) {
//       callback(message);
//     }
//   };
//   sb.addChannelHandler(channel.url, channelHandler);
// };
