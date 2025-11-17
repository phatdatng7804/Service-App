/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - full_name
 *               - email
 *               - numberPhone
 *               - password
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Nguyen Van A
 *               email:
 *                 type: string
 *                 example: example@gmail.com
 *               numberPhone:
 *                 type: string
 *                 pattern: "^[0-9]{10}$"
 *                 example: "0987654321"
 *               password:
 *                 type: string
 *                 pattern: "^[a-zA-Z0-9]{6,30}$"
 *                 example: abc123
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
 *         description: Dữ liệu không hợp lệ
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/auth/verify:
 *   post:
 *     summary: Xác minh mã OTP để kích hoạt tài khoản
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numberPhone
 *               - otp
 *             properties:
 *               numberPhone:
 *                 type: string
 *                 pattern: "^[0-9]{10}$"
 *                 example: "0987654321"
 *               otp:
 *                 type: string
 *                 pattern: "^[0-9]{6}$"
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Xác minh OTP thành công
 *       400:
 *         description: OTP không hợp lệ hoặc đã hết hạn
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Đăng nhập hệ thống
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - numberPhone
 *               - password
 *             properties:
 *               numberPhone:
 *                 type: string
 *                 pattern: "^[0-9]{10}$"
 *                 example: "0987654321"
 *               password:
 *                 type: string
 *                 pattern: "^[a-zA-Z0-9]{6,30}$"
 *                 example: abc123
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Sai thông tin đăng nhập
 *       500:
 *         description: Lỗi server
 */
