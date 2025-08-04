import nodemailer from 'nodemailer';

// Create transporter
const createTransporter = async () => {
  // Check if we have email credentials
  const hasEmailCredentials = process.env.EMAIL_USER && process.env.EMAIL_PASS;
  
  if (hasEmailCredentials) {
    // Real email sending (Gmail or other service)
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  } else {
    // Development/Testing - Use Ethereal Email
    console.log('📧 No email credentials found, using test email service');
    try {
      const testAccount = await nodemailer.createTestAccount();
      
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      });
    } catch (error) {
      console.log('📧 Failed to create test account, using mock transporter');
      // Fallback mock
      return {
        sendMail: async (mailOptions) => {
          console.log('📧 [MOCK] Email to:', mailOptions.to);
          console.log('📧 [MOCK] Subject:', mailOptions.subject);
          return { messageId: 'mock-' + Date.now() };
        }
      };
    }
  }
};

// Send welcome email to new members
const sendWelcomeEmail = async (email, name) => {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Elevate Dev Club <noreply@elevatedevclub.com>',
      to: email,
      subject: '🎉 Welcome to Elevate Dev Club!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; margin: 0;">🚀 Welcome to Elevate!</h1>
            <p style="font-size: 18px; margin: 10px 0;">Elevate Ideas. Empower Innovation.</p>
          </div>
          
          <div style="background: rgba(255,255,255,0.1); padding: 25px; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #FFD700; margin-top: 0;">Hi ${name}! 👋</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              Thank you for joining the Elevate Dev Club! We're thrilled to have you as part of our innovative community of developers, creators, and problem-solvers.
            </p>
            
            <h3 style="color: #FFD700; margin-top: 25px;">What's Next?</h3>
            <ul style="font-size: 14px; line-height: 1.8;">
              <li>🎯 Join our Discord server for real-time discussions</li>
              <li>📅 Check out our upcoming events and workshops</li>
              <li>💻 Explore our project gallery and contribute</li>
              <li>🤝 Connect with fellow developers and mentors</li>
              <li>🏆 Participate in hackathons and competitions</li>
            </ul>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://discord.gg/elevate" style="background: #7289DA; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Join Discord Community
              </a>
            </div>
          </div>
          
          <div style="text-align: center; font-size: 14px; opacity: 0.8;">
            <p>Follow us on social media for updates:</p>
            <p>
              <a href="#" style="color: #FFD700; text-decoration: none; margin: 0 10px;">Instagram</a> |
              <a href="#" style="color: #FFD700; text-decoration: none; margin: 0 10px;">LinkedIn</a> |
              <a href="#" style="color: #FFD700; text-decoration: none; margin: 0 10px;">GitHub</a>
            </p>
            <p style="margin-top: 20px;">
              Happy Coding! 💻✨<br>
              The Elevate Team
            </p>
          </div>
        </div>
      `,
      // Also include a plain text version
      text: `
        Welcome to Elevate Dev Club!
        
        Hi ${name}!
        
        Thank you for joining the Elevate Dev Club! We're thrilled to have you as part of our innovative community of developers, creators, and problem-solvers.
        
        What's Next?
        - Join our Discord server for real-time discussions
        - Check out our upcoming events and workshops
        - Explore our project gallery and contribute
        - Connect with fellow developers and mentors
        - Participate in hackathons and competitions
        
        Join our Discord: https://discord.gg/elevate
        
        Happy Coding!
        The Elevate Team
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    // Different logging based on email type
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log(`✅ Welcome email sent to ${email}!`);
      console.log(`📧 Message ID: ${info.messageId}`);
    } else {
      console.log(`📧 Test welcome email sent to ${email}`);
      console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return info;

  } catch (error) {
    console.error('❌ Error sending welcome email:', error.message);
    // Don't throw - registration should still succeed
  }
};

// Send contact form notification to admin
const sendContactNotification = async (contactData) => {
  try {
    const transporter = await createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_FROM || 'Elevate Dev Club <noreply@elevatedevclub.com>',
      to: process.env.ADMIN_EMAIL || 'admin@elevatedevclub.com',
      subject: `🔔 New Contact Form Submission: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Type:</strong> ${contactData.type}</p>
            <p><strong>Subject:</strong> ${contactData.subject}</p>
            <p><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-left: 4px solid #667eea; margin-top: 10px;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="background: #e3f2fd; padding: 15px; border-radius: 8px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Submission Details:</strong><br>
              ID: ${contactData.id}<br>
              Received: ${new Date().toLocaleString()}<br>
              IP: Contact form submission
            </p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      console.log('✅ Contact notification sent to admin!');
    } else {
      console.log('📧 Test contact notification sent');
      console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
    }
    
    return info;

  } catch (error) {
    console.error('❌ Error sending contact notification:', error.message);
  }
};

// Send newsletter email
const sendNewsletterEmail = async (subscribers, subject, content) => {
  try {
    const transporter = await createTransporter();
    
    const promises = subscribers.map(async (subscriber) => {
      const mailOptions = {
        from: process.env.EMAIL_FROM || 'Elevate Dev Club <noreply@elevatedevclub.com>',
        to: subscriber.email,
        subject: subject,
        html: content.replace('{{name}}', subscriber.name || 'Developer')
      };
      
      return await transporter.sendMail(mailOptions);
    });

    const results = await Promise.allSettled(promises);
    const successful = results.filter(result => result.status === 'fulfilled').length;
    const failed = results.filter(result => result.status === 'rejected').length;

    console.log(`📧 Newsletter sent: ${successful} successful, ${failed} failed`);
    return { successful, failed };

  } catch (error) {
    console.error('Error sending newsletter:', error);
    throw error;
  }
};

export { sendWelcomeEmail, sendContactNotification, sendNewsletterEmail };