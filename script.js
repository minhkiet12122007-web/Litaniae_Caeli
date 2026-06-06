// ─── 1. QUẢN LÝ POPUP CHI TIẾT SẢN PHẨM & THÀNH VIÊN (GIỮ NGUYÊN) ───

// Mở chi tiết Tác phẩm Concept (Dạng cuộn dọc Full-width truyền thống)
function openProduct(name, meta, desc, imgUrl) {
    const detailPage = document.getElementById('detail-page');
    const layoutContainer = document.getElementById('detail-layout-container');
    const scrollHint = document.getElementById('scroll-hint');

    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-price').innerText = meta;
    document.getElementById('detail-desc').innerHTML = desc;
    document.getElementById('detail-img').src = imgUrl;

    layoutContainer.classList.remove('member-layout');
    document.getElementById('orderForm').style.display = 'block';
    scrollHint.style.display = 'block';
    document.getElementById('form-product-name').value = name;

    detailPage.classList.remove('slide-from-right');
    detailPage.classList.add('slide-from-bottom');

    executeOpenSequence(detailPage);
}

// Mở chi tiết Thành viên (Dạng Tạp chí Editorial split 2 cột sắc sảo)
function openMember(name, position, bio, imgUrl) {
    const detailPage = document.getElementById('detail-page');
    const layoutContainer = document.getElementById('detail-layout-container');
    const scrollHint = document.getElementById('scroll-hint');

    document.getElementById('detail-name').innerText = name;
    document.getElementById('detail-price').innerText = position;
    document.getElementById('detail-desc').innerHTML = bio;
    document.getElementById('detail-img').src = imgUrl;

    document.getElementById('orderForm').style.display = 'none';
    scrollHint.style.display = 'none';
    layoutContainer.classList.add('member-layout');

    detailPage.classList.remove('slide-from-bottom');
    detailPage.classList.add('slide-from-right');

    executeOpenSequence(detailPage);
}

// Hàm xử lý mở hiển thị Văn kiện và Hướng dẫn tối ưu giao diện Split-view nghệ thuật
function openDocumentZone(title, subtitle, bodyContent, imgUrl) {
    openMember(title, subtitle, bodyContent, imgUrl);
}

function executeOpenSequence(detailPage) {
    detailPage.classList.remove('hidden');
    detailPage.scrollTop = 0;

    setTimeout(() => {
        detailPage.classList.add('active-page');
    }, 20);

    document.body.style.overflow = 'hidden';
}


// ─── 2. ĐÓNG OVERLAY CHI TIẾT (GIỮ NGUYÊN) ───
function closeDetail() {
    const detailPage = document.getElementById('detail-page');
    detailPage.classList.remove('active-page');

    setTimeout(() => {
        detailPage.classList.add('hidden');
        detailPage.classList.remove('slide-from-right', 'slide-from-bottom');
    }, 600);

    document.body.style.overflow = 'auto';
}


// ─── 3. XỬ LÝ SUBMIT FORM ĐĂNG KÝ SỞ HỮU TÁC PHẨM (GIỮ NGUYÊN) ───
document.getElementById('orderForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const productName = document.getElementById('form-product-name').value;
    const customerName = document.getElementById('customerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    alert(`[Litaniae Caeli] Trân trọng cảm ơn quý khách ${customerName}. Yêu cầu sở hữu tác phẩm "${productName}" với số điện thoại ${phoneNumber} đã được hệ thống ghi nhận. Chúng tôi sẽ liên hệ tư vấn trong thời gian sớm nhất.`);
    closeDetail();
    this.reset();
});