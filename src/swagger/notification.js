/**
 * @swagger
 * /api/v1/notification/get:
 *   get:
 *     summary: Lấy danh sách thông báo của người dùng hiện tại
 *     tags: [Notification]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         required: false
 *         description: Trang hiện tại (phân trang)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         required: false
 *         description: Số thông báo trên mỗi trang
 *     responses:
 *       200:
 *         description: Lấy danh sách thông báo thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: integer
 *                   example: 0
 *                 mes:
 *                   type: string
 *                   example: "Get notifications successfully"
 *                 notifications:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       user_id:
 *                         type: integer
 *                         example: 46
 *                       title:
 *                         type: string
 *                         example: "Đơn #123 đã được xác nhận"
 *                       body:
 *                         type: string
 *                         example: "Thợ A sẽ đến lúc 19:00."
 *                       type:
 *                         type: string
 *                         example: "booking_confirmed"
 *                       booking_id:
 *                         type: integer
 *                         nullable: true
 *                         example: 123
 *                       data:
 *                         type: object
 *                         nullable: true
 *                         example:
 *                           type: "booking_confirmed"
 *                           bookingId: "123"
 *                       is_read:
 *                         type: boolean
 *                         example: false
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 20
 *                     total:
 *                       type: integer
 *                       example: 5
 *       400:
 *         description: Yêu cầu không hợp lệ (tham số page/limit sai)
 *       500:
 *         description: Lỗi server
 */
