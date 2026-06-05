import os
import json
from flask import Flask, render_template_string, send_from_directory

app = Flask(__name__)


def load_local_posts():
    """Đọc dữ liệu bài viết tĩnh từ file JSON"""
    json_path = "posts_data.json"
    if os.path.exists(json_path):
        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    return []


@app.route('/')
def home():
    """Hiển thị trang chủ index.html nằm ngay thư mục gốc"""
    try:
        with open("index.html", "r", encoding="utf-8") as f:
            return render_template_string(f.read())
    except FileNotFoundError:
        return "Không tìm thấy file index.html trong thư mục.", 404


@app.route('/posts.html')
def posts_page():
    """Đọc file posts.html ở thư mục gốc và truyền dữ liệu JSON vào để hiển thị động"""
    posts_list = load_local_posts()
    try:
        with open("posts.html", "r", encoding="utf-8") as f:
            html_content = f.read()
        # Render động dữ liệu posts vào cấu trúc HTML
        return render_template_string(html_content, posts=posts_list)
    except FileNotFoundError:
        return "Không tìm thấy file posts.html trong thư mục.", 404


@app.route('/<path:filename>')
def serve_static_files(filename):
    """Cấu hình bổ sung để Flask hiểu và tải được các file tĩnh (css, js, hình ảnh) nằm cùng thư mục gốc"""
    return send_from_directory('.', filename)


if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
