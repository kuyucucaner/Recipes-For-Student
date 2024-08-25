const nodemailer = require('nodemailer');
require('dotenv').config();
const { sendEmail } = require('../../controllers/mail-controller');

jest.mock('nodemailer');

describe('sendEmail', () => {
  let sendMailMock;

  beforeEach(() => {
    sendMailMock = jest.fn();
    const transporterMock = {
      sendMail: sendMailMock
    };
    nodemailer.createTransport.mockReturnValue(transporterMock);
  });

  it('should send an email', async () => {
    sendMailMock.mockResolvedValueOnce('Email sent successfully');

    const to = 'recipients@example.com';
    const subject = 'Recipe suggestion';
    const text = 'Check out this new recipe: My Favorite Pasta';

    await expect(sendEmail(to, subject, text)).resolves.toBeUndefined();

    expect(sendMailMock).toHaveBeenCalledWith({
      from: process.env.MAIL_ID,
      to,
      subject,
      text
    });
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });

  it('should handle errors when sending an email', async () => {
    const errorMessage = 'Failed to send email';
    sendMailMock.mockRejectedValueOnce(new Error(errorMessage));

    const to = 'recipients@example.com';
    const subject = 'Recipe suggestion';
    const text = 'Check out this new recipe: My Favorite Pasta';

    await expect(sendEmail(to, subject, text)).rejects.toThrow(`Error sending email: ${errorMessage}`);

    expect(sendMailMock).toHaveBeenCalledWith({
      from: process.env.MAIL_ID,
      to,
      subject,
      text
    });
    expect(sendMailMock).toHaveBeenCalledTimes(1);
  });
});
