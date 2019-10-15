const nodemailer = require('nodemailer')
const { codes } = require('../../codes/commonCodes')
const { generateMailTemplate } = require('./generateMailTemplate')

const companyEmail = 'unify.prescriptions@gmail.com'
const companyPassword = 'unify_94825'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: companyEmail,
    pass: companyPassword
  }
})

const sendConfirmationMail = async (email, confirmationUrl) => {
  const mail = {
    from: companyEmail,
    to: email,
    subject: `${codes.COMPANY.NAME}: confirmación de cuenta`,
    html: generateMailTemplate(codes.COMPANY.NAME, confirmationUrl)
  }
  await transporter.sendMail(mail)
}

module.exports = { sendConfirmationMail }