/**
 * @swagger
 * /api/v1/device-tokens/register:
 *   post:
 *     summary: Đăng ký hoặc cập nhật FCM device token cho người dùng hiện tại
 *     tags: [DeviceToken]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               fcm_token: "e8Tx1u3gQ4S9bCkLmNoPqr:APA91bH..."
 *               platform: "android"
 *               device_id: "device-uuid-or-id-123"
 *     responses:
 *       200:
 *         description: Đăng ký / cập nhật device token thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/device-tokens/send:
 *   post:
 *     summary: Gửi thông báo đẩy đến người dùng
 *     tags: [DeviceToken]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID của người dùng muốn gửi (tùy chọn). Nếu không truyền sẽ gửi cho user hiện tại.
 *               title:
 *                 type: string
 *                 description: Tiêu đề thông báo
 *                 example: "Bạn có thông báo mới"
 *               body:
 *                 type: string
 *                 description: Nội dung thông báo
 *                 example: "Đơn hàng #DH12345 của bạn đã được xác nhận"
 *               data:
 *                 type: object
 *                 description: Payload dữ liệu kèm theo (tùy chọn)
 *                 example:
 *                   screen: "OrderDetail"
 *                   orderId: 12345
 *     responses:
 *       200:
 *         description: Gửi thông báo thành công
 *         content:
 *           application/json:
 *             example:
 *               err: 0
 *               mes: "Notification sent"
 *               successCount: 1
 *       400:
 *         description: Yêu cầu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
