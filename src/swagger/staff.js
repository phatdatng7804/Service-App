/**
 * @swagger
 * /api/v1/staff/profile:
 *   put:
 *     summary: Cập nhật hồ sơ staff (thông tin salon/store mặc định)
 *     tags: [Staff]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               experience_years:
 *                 type: integer
 *                 description: Số năm kinh nghiệm của staff
 *                 example: 3
 *               is_active:
 *                 type: boolean
 *                 description: Trạng thái hoạt động của staff
 *                 example: true
 *               store_name:
 *                 type: string
 *                 description: Tên salon / cửa hàng
 *                 example: "Salon ABC - Chi nhánh Quận 1"
 *               store_address:
 *                 type: string
 *                 description: Địa chỉ mặc định nơi thực hiện dịch vụ
 *                 example: "123 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM"
 *               store_lat:
 *                 type: number
 *                 format: float
 *                 description: Vĩ độ (latitude) của địa chỉ salon
 *                 example: 10.7731234
 *               store_lng:
 *                 type: number
 *                 format: float
 *                 description: Kinh độ (longitude) của địa chỉ salon
 *                 example: 106.7009876
 *               bio:
 *                 type: string
 *                 description: Mô tả ngắn / giới thiệu về staff
 *                 example: "Chuyên cắt tóc nữ, tạo kiểu và trang điểm cô dâu"
 *     responses:
 *       200:
 *         description: Cập nhật hồ sơ staff thành công
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
 *                   example: "Staff profile updated successfully"
 *                 profile:
 *                   type: object
 *                   properties:
 *                     staff_id:
 *                       type: integer
 *                       example: 5
 *                     experience_years:
 *                       type: integer
 *                       example: 3
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                     store_name:
 *                       type: string
 *                       example: "Salon ABC - Chi nhánh Quận 1"
 *                     store_address:
 *                       type: string
 *                       example: "123 Lê Lợi, Phường Bến Thành, Quận 1, TP.HCM"
 *                     store_lat:
 *                       type: number
 *                       format: float
 *                       example: 10.7731234
 *                     store_lng:
 *                       type: number
 *                       format: float
 *                       example: 106.7009876
 *                     bio:
 *                       type: string
 *                       example: "Chuyên cắt tóc nữ, tạo kiểu và trang điểm cô dâu"
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       401:
 *         description: Không có quyền (thiếu hoặc sai token)
 *       500:
 *         description: Lỗi server
 */
