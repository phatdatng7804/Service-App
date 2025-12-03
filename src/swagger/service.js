/**
 * @swagger
 * /api/v1/service/get-all:
 *   get:
 *     summary: Lấy danh sách tất cả dịch vụ
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Từ khóa tìm kiếm dịch vụ
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
 * /api/v1/service/get-my-service:
 *   get:
 *     summary: Lấy danh sách dịch vụ của cá nhân
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         required: false
 *         description: Từ khóa tìm kiếm dịch vụ
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
 * /api/v1/service/create:
 *   post:
 *     summary: Tạo dịch vụ mới
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 30
 *                 example: "Massage Thư Giãn"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 example: "Dịch vụ massage thư giãn toàn thân"
 *               duration_minutes:
 *                 type: integer
 *                 minimum: 1
 *                 example: 60
 *               price:
 *                 type: integer
 *                 minimum: 10000
 *                 example: 200000
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               is_active:
 *                 type: boolean
 *                 example: true
 *             required:
 *               - name
 *               - duration_minutes
 *               - price
 *               - category_id
 *     responses:
 *       200:
 *         description: Tạo dịch vụ thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/service/update/{id}:
 *   put:
 *     summary: Cập nhật dịch vụ
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dịch vụ cần cập nhật
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 150
 *                 example: "Massage Cao Cấp"
 *               description:
 *                 type: string
 *                 nullable: true
 *                 example: "Giảm đau, thư giãn sâu"
 *               duration_minutes:
 *                 type: integer
 *                 minimum: 1
 *                 example: 90
 *               price:
 *                 type: integer
 *                 minimum: 10000
 *                 example: 350000
 *               category_id:
 *                 type: integer
 *                 example: 2
 *               is_active:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/service/delete/{id}:
 *   delete:
 *     summary: Xóa dịch vụ theo ID
 *     tags: [Service]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID dịch vụ cần xóa
 *     responses:
 *       200:
 *         description: Xóa dịch vụ thành công
 *       500:
 *         description: Lỗi server
 */
