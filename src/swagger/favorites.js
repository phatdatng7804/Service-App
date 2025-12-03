/**
 * @swagger
 * /api/v1/favorite/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả dịch vụ yêu thích
 *     tags: [Favorite]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Từ khóa tìm kiếm (nếu có)
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
 * /api/v1/favorite/create:
 *   post:
 *     summary: Thêm dịch vụ yêu thích mới
 *     tags: [Favorite]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               name: "Spa"
 *               description: "Các dịch vụ spa"
 *               image: "https://example.com/image.jpg"
 *     responses:
 *       200:
 *         description: Tạo category thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/favorite/delete/{id}:
 *   delete:
 *     tags: [Favorite]
 *     summary: Xóa dịch vụ khỏi danh sách yêu thích
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - service_id
 *             properties:
 *               service_id:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Xóa yêu thích thành công
 *       404:
 *         description: Không tồn tại trong danh sách yêu thích
 */
