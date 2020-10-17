import firebase from '../../firebase/config';

export const senderMessage = async (
  messageValue,
  currentUserId,
  guestUserId,
  img,
) => {
  try {
    return await firebase
      .database()
      .ref('messages/' + currentUserId)
      .child(guestUserId)
      .push({
        message: {
          sender: currentUserId,
          receiver: guestUserId,
          msg: messageValue,
          img: img,
        },
      });
  } catch (error) {
    return error;
  }
};

export const receiverMessage = async (
  messageValue,
  currentUserId,
  guestUserId,
  img,
) => {
  try {
    return await firebase
      .database()
      .ref('messages/' + guestUserId)
      .child(currentUserId)
      .push({
        message: {
          sender: currentUserId,
          receiver: guestUserId,
          msg: messageValue,
          img: img,
        },
      });
  } catch (error) {
    return error;
  }
};
