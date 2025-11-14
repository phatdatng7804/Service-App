/**
 * @swagger
 * /api/v1/rating/get-staff:
 *   get:
 *     summary: Lấy danh sách đánh giá dành cho nhân viên hiện tại
 *     tags: [Rating]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: rating
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 5
 *         description: Lọc theo số sao (1–5)
 *       - in: query
 *         name: service_id
 *         schema:
 *           type: integer
 *         description: Lọc theo ID dịch vụ
 *       - in: query
 *         name: booking_id
 *         schema:
 *           type: integer
 *         description: Lọc theo ID booking
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *         description: Sắp xếp theo thời gian
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
 * /api/v1/rating/create:
 *   post:
 *     summary: Tạo đánh giá dịch vụ (rating)
 *     tags: [Rating]
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
 *                 example: 12
 *               booking_id:
 *                 type: integer
 *                 example: 1003
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 maxLength: 1000
 *                 nullable: true
 *                 example: "Dịch vụ rất tốt, nhân viên thân thiện!"
 *             required:
 *               - service_id
 *               - booking_id
 *               - rating
 *     responses:
 *       200:
 *         description: Tạo rating thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
