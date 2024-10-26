// utils/jwtUtil.js
const jwtUtil = {
	// 从 Token 中提取用户 ID
	extractUserId: function(token) {
			// JWT 由三部分组成：header.payload.signature，用 . 分割
			const parts = token.split('.');
			if (parts.length !== 3) {
					throw new Error('无效的 Token');
			}
			
			// Base64Url 解码 payload
			const payload = JSON.parse(this.base64UrlDecode(parts[1]));
			const userId = payload.id; // 获取用户 ID

			if (!userId) {
					throw new Error('无效的 Token');
			}
			return userId;
	},

	// Base64Url 解码
	base64UrlDecode: function(str) {
			// 将 Base64Url 转换为 Base64
			const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
			return decodeURIComponent(escape(atob(base64)));
	}
};

export default jwtUtil;
