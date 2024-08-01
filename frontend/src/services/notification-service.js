import { sendNotification } from '../utils/notification-utils';


export const notifyNewRecipe = (recipeName) => {
  sendNotification('New Recipe Available!', {
    title: 'Congratulations!',
    body: `Check out our new recipe: ${recipeName}`,
    icon: 'https://via.placeholder.com/150'
  }, 'http://localhost:3000/recipe-list');
};

export const notifyUserByEmail = async (recipeName) => {
  try {
    const response = await fetch('http://localhost:5000/api/mails/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'tahacanokuyucu@gmail.com',
        subject: 'New Recipe Available!',
        text: `Hi there,\n\nCheck out our new recipe: ${recipeName}.\n\nBest regards,\nYour Team`,
      }),
    });

    if (!response.ok) {
      throw new Error('Error sending email');
    }

    console.log('Email sent successfully');
  } catch (error) {
    console.error(error);
  }
};


