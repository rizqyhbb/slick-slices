const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

const generatedOrderEmail = ({ order, total }) =>
  `<div>
<h2>Your Recent Order for ${total}</h2>
<p>Please start walking over, we will have your order ready in the next 20 mins.</p>
<ul>
  ${order
    .map(
      (item) => `<li>
    <img src="${item.thumbnail}" alt="${item.name}"/>
    ${item.size} ${item.name} - ${item.price}
  </li>`
    )
    .join('')}
</ul>
<p>Your total is <strong>$${total}</strong> due at pickup</p>
<style>
    ul {
      list-style: none;
    }
</style>
</div>`;

exports.handler = async (event, context) => {
  // check if the body is valid
  const body = JSON.parse(event.body);

  // check if it is a bot, real user won't be filled the honeypot

  if (body.mappleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: 'beep boop buup zzzst 123!#@%^$#',
      }),
    };
  }

  const requiredFields = ['name', 'email', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Opps! you are missing ${field} field`,
        }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `You are not order anything!?`,
      }),
    };
  }

  // send email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com> ",
    to: 'orders@example.com',
    subject: 'New order!',
    html: generatedOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
