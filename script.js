// ─── 1. QUẢN LÝ CUSTOM CURSOR ĐUỔI BẮT SIÊU MƯỢT ───
const cursor = document.getElementById('cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 1;
    cursorY += (mouseY - cursorY) * 1;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';

    requestAnimationFrame(animateCursor);
}
requestAnimationFrame(animateCursor);

function initCustomCursor() {
    const hoverTargets = document.querySelectorAll('.hover-target');

    hoverTargets.forEach(target => {
        target.removeEventListener('mouseenter', onMouseEnter);
        target.removeEventListener('mouseleave', onMouseLeave);

        target.addEventListener('mouseenter', onMouseEnter);
        target.addEventListener('mouseleave', onMouseLeave);
    });
}

function onMouseEnter(e) {
    cursor.classList.add('active');
    cursor.innerText = e.currentTarget.getAttribute('data-hover') || '';
}

// Khởi chạy lắng nghe cursor lần đầu tiên
initCustomCursor();


// ─── 2. ĐIỀU HƯỚNG MỞ OVERLAY CHI TIẾT ───

// Mở chi tiết Tác phẩm Concept (Dạng cuộn dọc Full-width truyền thống)
function openProduct(name, meta, desc, imgUrl) {
    const detailPage = document.getElementById('detail-page');
    const layoutContainer = document.getElementById('detail-layout-container');
    const scrollHint = document.getElementById('scroll-hint');

    // Cập nhật dữ liệu
    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-price').innerText = meta;
    document.getElementById('detail-desc').innerHTML = desc; // Dùng innerHTML nhận diện thẻ ngắt dòng
    document.getElementById('detail-img').src = imgUrl;

    // Thiết lập cấu hình layout cho Concept Product
    layoutContainer.classList.remove('member-layout');
    document.getElementById('orderForm').style.display = 'block';
    scrollHint.style.display = 'block';
    document.getElementById('form-product-name').value = name;

    // ensure correct entry animation (from bottom for product)
    detailPage.classList.remove('slide-from-right');
    detailPage.classList.add('slide-from-bottom');

    executeOpenSequence(detailPage);
}

// Mở chi tiết Thành viên (Dạng Tạp chí Editorial split 2 cột sắc sảo)
function openMember(name, position, bio, imgUrl) {
    const detailPage = document.getElementById('detail-page');
    const layoutContainer = document.getElementById('detail-layout-container');
    const scrollHint = document.getElementById('scroll-hint');

    // Cập nhật dữ liệu
    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-price').innerText = position;
    document.getElementById('detail-desc').innerHTML = bio; // Dùng innerHTML nhận diện thẻ đoạn văn bọc sẵn
    document.getElementById('detail-img').src = imgUrl;

    // Thiết lập cấu hình layout riêng cho Member (Ẩn Form đăng ký và Icon Cuộn chuột)
    document.getElementById('orderForm').style.display = 'none';
    scrollHint.style.display = 'none';
    layoutContainer.classList.add('member-layout');

    // ensure correct entry animation (from right for member)
    detailPage.classList.remove('slide-from-bottom');
    detailPage.classList.add('slide-from-right');

    executeOpenSequence(detailPage);
}

// Hàm bổ trợ thực thi chuỗi hoạt họa mở mượt mà
function executeOpenSequence(detailPage) {
    detailPage.classList.remove('hidden');
    detailPage.scrollTop = 0;

    setTimeout(() => {
        detailPage.classList.add('active-page');
        initCustomCursor(); // Kích hoạt tương tác cursor cho các nút mới xuất hiện
    }, 20);

    document.body.style.overflow = 'hidden'; // Khóa cuộn trang chính bên dưới
}


// ─── 3. ĐÓNG OVERLAY CHI TIẾT ───
function closeDetail() {
    const detailPage = document.getElementById('detail-page');
    detailPage.classList.remove('active-page');

    setTimeout(() => {
        detailPage.classList.add('hidden');
        // clear any slide classes so next open can choose animation
        detailPage.classList.remove('slide-from-right', 'slide-from-bottom');
    }, 600);

    document.body.style.overflow = 'auto'; // Trả lại trạng thái cuộn trang chủ
    cursor.classList.remove('active');
    cursor.innerText = '';
}


// ─── 4. XỬ LÝ SUBMIT FORM ĐĂNG KÝ SỞ HỮU TÁC PHẨM ───
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const productName = document.getElementById('form-product-name').value;
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    alert(`[Litaniae Caeli] Trân trọng cảm ơn quý khách ${customerName}. Yêu cầu sở hữu tác phẩm "${productName}" với số điện thoại ${phoneNumber} đã được hệ thống ghi nhận. Chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.`);
    closeDetail();
    this.reset();
});

// Cập nhật lại danh sách các nút tương tác mới thêm ở phần Footer
initCustomCursor();