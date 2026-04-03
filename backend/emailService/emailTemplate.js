

export const BOOKING_CONFIRM_TEMP = `

  <!DOCTYPE html>
  <html>
    <head>
      <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; font-size: 70%;}
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #003580; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; }
          .booking-details { background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #003580; }
          .button { background-color: #003580; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
          <div class="header">
              <h1>Booking Confirmation</h1>
          </div>
          
          <div class="content">
              <p>Dear {guestName},</p>
              <p>Thank you for choosing {hotelName}! Your booking has been confirmed.</p>
              
              <div class="booking-details">
                  <h3>Booking Details</h3>
                  <p><strong>Booking Reference:</strong> {bookingId}</p>
                  <p><strong>Room Name:</strong> {roomName}</p>
                  <p><strong>Room Number:</strong> {roomNumber}</p>
                  <p><strong>Check-in:</strong> {checkInDate} (from 2:00 PM)</p>
                  <p><strong>Check-out:</strong> {checkOutDate} (until 12:00 PM)</p>
                  <p><strong>Room Type:</strong> {roomType}</p>
                  <p><strong>Guests:</strong> {guests}</p>
                  <p><strong>Total Amount:</strong> {totalPrice}</p>
              </div>
              
              <p>We look forward to welcoming you to {hotelName}. If you have any special requests or need to modify your booking, please don't hesitate to contact us.</p>
              
              <p>Best regards,<br>The LetStay Team</p>
          </div>
          
          <div class="footer">
              <p>{hotelName} | {hotelAddress}</p>
              <p>© {year} LetStay. All rights reserved.</p>
          </div>
      </div>
    </body>
  </html>


`

export const TEMP = `

  <!DOCTYPE html>
  <html>
    <head>
      <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; font-size: 70%;}
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #003580; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; }
          .footer { background-color: #f5f5f5; padding: 10px; text-align: center; font-size: 12px; }
          .booking-details { background-color: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #003580; }
          .button { background-color: #003580; color: white; padding: 10px 15px; text-decoration: none; border-radius: 4px; display: inline-block; }
      </style>
    </head>
    <body>
      <div class="container">
          <div class="header">
              <h1>Email Verification </h1>
          </div>
          
          <div class="content">
              <p>Dear {guestName},</p>
              <p>Thank you for choosing {hotelName}!, your verification code is:</p>
              <div style="text-align: center; margin: 30px 0;">
                <span style="font-size: 30px; font-weight: bold; letter-spacing: 5px; color: green;">{verificationCode}</span>
              </div>
              
    
              
              <p>Enter this code on the verification page to complete your registration</p>
              <p>This code will expire after 15 minites for security reasons</p>
              <p>If you didnt create an account with us, please ignore this message</p>
      
              
              <p>Best regards,<br>The LetStay Team</p>
          </div>
          
          <div class="footer">
              <p>{hotelName} | {hotelAddress}</p>
              <p>© {year} LetStay. All rights reserved.</p>
          </div>
      </div>
    </body>
  </html>


`

export const VERIFICATION_EMAIL_TEMP = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="view-port" content="width=device-width, initial-scale = 1.0"> 
   <title>Verify Your Email</title> 
  </head>
  <body style = "font-family: Poppins, sans-serif; margin: 0, auto; max-width: 600px; padding: 20px; color: #333;">
    <div style="text-align: center; padding: 20px;">
      <h1 style="color: #fff; margin: auto;">Verify your email</h1>
    </div>
    <div style="background-color: #f9f9f9; padding: 20px; border-radius: 0 5px 5px 0; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p>Hello,</p>
      <p>Thank you for signing up, your verification code is:</p>
      <div style="text-align: center; margin: 30px 0;">
        <span style="font-size: 30px; font-weight: bold; letter-spacing: 5px; color: green;">{verificationCode}</span>
      </div>
      <p>Enter this code on the verification page to complete your registration</p>
      <p>This code will expire after 15 minites for security reasons</p>
      <p>If you didnt create an account with us, please ignore this message</p>
      <p>Best regards, <br>StayHub</p>
      
      <div style="color: #888; margin-top: 20px; text-align: center; font-size: 10px;">
        <p>This is an automated message, please do not reply to this email</p>
      </div>
      
    </div>
  </body>
</html>

`