import { sendCSKHSMS, sendOTPSMS } from "../../smsService";

export const notifyBookingCancel = async (booking = []) => {
  const customer = booking
    .filter((b) => b.customer?.phone_number)
    .map((b) => ({
      name: b.customer.full_name,
      phone: b.customer.phone_number.startsWith("84")
        ? b.customer.phone_number
        : `84${b.customer.phone_number.replace(/^0+/, "")}`,
    }));
  console.log("${customers.length}", customer);
  for (const c of customer) {
    const message = `Gửi ${c.name},lịch hẹn của bạn đã bị hủy.Chúng tôi xin lỗi vì sự bất tiện này`;
    try {
      const result = await sendOTPSMS(c.phone, message);
      if (result.err === 0) {
        console.log(`SMS sent to ${c.phone} successfully`);
      } else {
        console.log(`Failed to send SMS to ${c.phone}: ${result.mes}`);
      }
    } catch (error) {
      console.log(`Error sending SMS to ${c.phone}:`, error);
    }
  }
};
