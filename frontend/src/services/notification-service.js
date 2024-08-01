// src/services/notificationService.js
import { sendNotification } from '../utils/notification-utils';

export const notifyNewRecipe = (recipeName) => {
  sendNotification('New Recipe Available!', {
    title:'congratz!',
    body: `Check out our new recipe: ${recipeName}`,
  });
};

export const notifyUserByEmail = (userEmail, recipeName) => {
  // E-posta gönderim işlevini buraya ekleyebilirsiniz
  console.log(`Sending email to ${userEmail} about new recipe: ${recipeName}`);
};
