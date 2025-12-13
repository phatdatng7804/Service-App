/**
 * @swagger
 * /api/v1/booking/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả booking (theo quyền user)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Lọc theo trạng thái booking
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Lọc theo ngày booking
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang (pagination)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số lượng mỗi trang
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: Query không hợp lệ
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/v1/booking/create:
 *   post:
 *     summary: Tạo booking mới
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_id:
 *                 type: integer
 *                 example: 3
 *               customer_id:
 *                 type: integer
 *                 example: 10
 *               booking_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-05-01"
 *               number_phone:
 *                 type: string
 *                 pattern: "^[0-9]{9,11}$"
 *                 example: "0934567890"
 *               start_time:
 *                 type: string
 *                 pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$"
 *                 example: "14:00"
 *               end_time:
 *                 type: string
 *                 pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$"
 *                 example: "15:00"
 *               note:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Khách muốn làm sớm hơn"
 *             required:
 *               - service_id
 *               - booking_date
 *               - start_time
 *               - end_time
 *     responses:
 *       200:
 *         description: Tạo booking thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/v1/booking/update/{id}:
 *   put:
 *     summary: Cập nhật thông tin booking
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID booking cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               service_id:
 *                 type: integer
 *                 example: 2
 *               booking_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-06-12"
 *               start_time:
 *                 type: string
 *                 pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$"
 *                 example: "08:00"
 *               end_time:
 *                 type: string
 *                 pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$"
 *                 example: "09:00"
 *               status:
 *                 type: string
 *                 enum: ["pending", "confirmed", "completed", "canceled"]
 *                 example: "confirmed"
 *               note:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Đổi lại giờ chiều"
 *     responses:
 *       200:
 *         description: Cập nhật booking thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/v1/booking/cancel/{id}:
 *   patch:
 *     summary: Hủy một booking theo ID
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID booking cần hủy
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancel_note:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Khách bận đột xuất"
 *     responses:
 *       200:
 *         description: Hủy booking thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/v1/booking/cancel-all:
 *   patch:
 *     summary: Hủy tất cả booking của nhân viên hiện tại
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cancel_note:
 *                 type: string
 *                 maxLength: 255
 *                 example: "Shop nghỉ đột xuất"
 *     responses:
 *       200:
 *         description: Hủy toàn bộ booking thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/booking/history:
 *   get:
 *     summary: Lấy lịch sử booking (theo quyền user)
 *     tags: [Booking]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Lọc theo trạng thái booking
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *         description: Lọc theo ngày booking
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Trang (pagination)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Số lượng mỗi trang
 *     responses:
 *       200:
 *         description: Thành công
 *       400:
 *         description: Query không hợp lệ
 *       500:
 *         description: Lỗi server
 */
