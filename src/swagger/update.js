/**
 * @swagger
 * /api/v1/user/upload/{id}:
 *   put:
 *     summary: Upload avatar cho user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của user
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: File avatar tải lên
 *     responses:
 *       200:
 *         description: Upload thành công
 *       400:
 *         description: File không hợp lệ hoặc thiếu id
 *       401:
 *         description: Không có quyền
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/user/update-user/{id}:
 *   put:
 *     summary: Cập nhật thông tin user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               full_name:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *             example:
 *               full_name: "Nguyễn Văn A"
 *               gender: "male"
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu nhập không hợp lệ
 *       401:
 *         description: Không có quyền
 *       500:
 *         description: Lỗi server
 */
