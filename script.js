// Quản lý trạng thái Custom Cursor di chuyển mượt mà theo chuột máy tính
const cursor = document.getElementById('cursor');

function initCustomCursor() {
    const hoverTargets = document.querySelectorAll('.hover-target');

    hoverTargets.forEach(target => {
        // Reset trình lắng nghe cũ tránh lặp bộ nhớ
        target.removeEventListener('mouseenter', onMouseEnter);
        target.removeEventListener('mouseleave', onMouseLeave);

        target.addEventListener('mouseenter', onMouseEnter);
        target.addEventListener('mouseleave', onMouseLeave);
    });
}

function onMouseEnter(e) {
    cursor.classList.add('active');
    cursor.innerText = e.currentTarget.getAttribute('data-hover');
}

function onMouseLeave() {
    cursor.classList.remove('active');
    cursor.innerText = '';
}

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Chạy khởi tạo chuột ngay lúc mở trang đầu tiên
initCustomCursor();


// ─── 1. XỬ LÝ CLICK CONCEPT GIÀY: LAYOUT DỌC TRƯỢT TỪ DƯỚI LÊN (ẢNH 85VH) ───
function openDetail(name, price, desc, imgUrl) {
    const detailPage = document.getElementById('detail-page');
    const layoutContainer = document.getElementById('detail-container-layout');
    const scrollHint = document.getElementById('scroll-hint');

    // Nạp dữ liệu động vào cây DOM
    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-price').innerText = price;
    document.getElementById('detail-desc').innerText = desc;
    document.getElementById('detail-img').src = imgUrl;
    document.getElementById('form-product-name').value = name;

    // Hiện đầy đủ form và chuột cuộn hướng dẫn
    document.getElementById('orderForm').style.display = 'block';
    scrollHint.style.display = 'block';

    // Đưa về trạng thái layout dọc chuẩn của Concept Giày
    layoutContainer.classList.remove('member-layout');
    detailPage.classList.remove('slide-from-right');

    detailPage.classList.remove('hidden');
    detailPage.scrollTop = 0; // Reset thanh cuộn để kích hoạt animation chữ từ đầu

    // Dùng setTimeout tạo độ trễ nhỏ để CSS kịp tính toán hiệu ứng transition mượt mà
    setTimeout(() => {
        detailPage.classList.add('active-page');
    }, 15);

    document.body.style.overflow = 'hidden'; // Khóa cuộn trang nền chính bên dưới
    initCustomCursor(); // Re-init chuột cho các phần tử bên trong trang overlay vừa hiện
}


// ─── 2. XỬ LÝ CLICK THÀNH VIÊN: LAYOUT SONG SONG CHIA CỘT 45/55 TRƯỢT NGANG TỪ PHẢI SANG ───
function openMemberDetail(name, role, achievements, imgUrl) {
    const detailPage = document.getElementById('detail-page');
    const layoutContainer = document.getElementById('detail-container-layout');
    const scrollHint = document.getElementById('scroll-hint');

    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-price').innerText = role;
    document.getElementById('detail-desc').innerText = achievements;
    document.getElementById('detail-img').src = imgUrl;

    // Ẩn form đặt hàng và chuột cuộn hướng dẫn vì đây là trang thông tin thành viên nhóm
    document.getElementById('orderForm').style.display = 'none';
    scrollHint.style.display = 'none';

    // Kích hoạt Class biến dạng thành dạng 2 cột song song và đổi chiều trượt từ phải qua
    layoutContainer.classList.add('member-layout');
    detailPage.classList.add('slide-from-right');

    detailPage.classList.remove('hidden');
    detailPage.scrollTop = 0;

    setTimeout(() => {
        detailPage.classList.add('active-page');
    }, 15);

    document.body.style.overflow = 'hidden';
    initCustomCursor();
}


// ─── 3. ĐÓNG TRANG OVERLAY CHI TIẾT CHI TIẾT CHUNG ───
function closeDetail() {
    const detailPage = document.getElementById('detail-page');
    detailPage.classList.remove('active-page');

    // Chờ hiệu ứng trượt hoàn tất (850ms giống CSS) rồi mới đưa về trạng thái ẩn hẳn hoàn toàn
    setTimeout(() => {
        detailPage.classList.add('hidden');
        detailPage.classList.remove('slide-from-right');
    }, 850);

    document.body.style.overflow = 'auto'; // Trả lại khả năng cuộn trang chính bình thường
    cursor.classList.remove('active');
    cursor.innerText = '';
}


// ─── 4. XỬ LÝ ĐĂNG KÝ FORM ĐƠN HÀNG PREMIUM ───
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const productName = document.getElementById('form-product-name').value;
    const customerName = document.getElementById('customerName').value;

    alert(`⚡ PREMIUM ORDER SUCCESS!\n\nCảm ơn ${customerName} đã tin tưởng đăng ký đặt mua chiếc ${productName}.\nChúng mình sẽ phản hồi đến bạn trong thời gian sớm nhất.`);

    this.reset();
    closeDetail();
});