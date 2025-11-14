/**
 * @swagger
 * /api/v1/get-rate:
 *   get:
 *     summary: Lấy danh sách đánh giá
 *     tags: [Rate Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Thành công
 */
/**
 * @swagger
 * /api/v1/admin-user/get-admin:
 *   get:
 *     summary: Lấy danh sách user/admin với bộ lọc
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: role_id
 *         schema:
 *           type: integer
 *           enum: [1, 2, 3]
 *         description: Lọc theo vai trò
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: boolean
 *         description: Lọc theo trạng thái hoạt động
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *           maxLength: 30
 *         description: Tìm kiếm theo tên, email…
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
 * /api/v1/admin-user/update-admin/{id}:
 *   put:
 *     summary: Cập nhật thông tin user/admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 example: "Nguyen Van A"
 *               email:
 *                 type: string
 *                 nullable: true
 *                 example: "user@example.com"
 *               phone_number:
 *                 type: string
 *                 pattern: "^[0-9]{10}$"
 *                 example: "0912345678"
 *               role_id:
 *                 type: integer
 *                 enum: [1, 2, 3]
 *                 example: 2
 *               is_active:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Cập nhật user thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */

/**
 * @swagger
 * /api/v1/admin-user/delete-admin/{id}:
 *   delete:
 *     summary: Xóa user/admin theo ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID user muốn xóa
 *     responses:
 *       200:
 *         description: Xóa thành công
 *       400:
 *         description: ID không hợp lệ
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/admin-user/toggle-admin/{id}:
 *   patch:
 *     summary: Bật hoặc tắt trạng thái hoạt động của user/admin
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               is_active:
 *                 type: boolean
 *                 example: false
 *             required:
 *               - is_active
 *     responses:
 *       200:
 *         description: Cập nhật trạng thái thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
